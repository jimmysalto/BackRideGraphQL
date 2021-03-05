const UbicacionConductor = require('../models/UbicacionConductor');
const Conductor = require('../models/Conductor');
const Solicitud = require('../models/Solicitud');
const Vehiculos = require('../models/Vehiculos');
const search =  require('../helpers/search'); 

require('dotenv').config({path:'variables.env'});

const POST_ADDED = 'POST_ADDED';
const resolvers = {
    
    Query:{

        //============================ Vehiculos ============================
        obtenerVehiculos: async ()=>{
            try {
                const vehiculos = await Vehiculos.find({}); // Return all ubicaciones
                console.log(vehiculos);
                return vehiculos;
            } catch (error) {
                console.log(error);
                return error;
            }
        },


        //============================ Conductores ============================
        obtenerConductores: async ()=>{
            try {
                const conductores = await Conductor.find({}); // Return all ubicaciones
                console.log(conductores);
                return conductores;
            } catch (error) {
                console.log(error);
                return error;
            }
        },

        obtenerUbicacionesConductor: async ()=>{
            //db.foo.find().sort({_id:1}).limit(50);
            try {
                const ubicaciones = await UbicacionConductor.find().sort({$natural:-1});
               // console.log(ubicaciones);
                return ubicaciones;
            } catch (error) {
                console.log(error);
            }
        },


        obtenerUbicacionConductor: async (_, {id})=>{
             
            const query = { "idConductor": id };

            try {
                const ubicacion = await UbicacionConductor.find(query).limit(1).sort({$natural:-1});
                //console.log(ubicacion);
                return ubicacion;
            } catch (error) {
                console.log(error);
            }
        },

        //============================ Solicitudes ============================
        obtenerSolicitud: async (_, {id})=>{
             
            const query = { "conductor._id": id };
            console.log(query);
            try {
                const solicitud = await Solicitud.find(query).limit(1).sort({$natural:-1});
                console.log(solicitud);
                return solicitud;
            } catch (error) {
                console.log(error);
            }
        },
            
        obtenerSolicitudes: async (_, {limit, offset,estado,tipoSolicitud,searchText})=>{ 
            
            console.clear()
            console.log(estado,tipoSolicitud,searchText)
            try {
                 //const solicitudes = await Solicitud.find({}).limit(10).sort({$natural:-1}); 
                let solicitudes = await Solicitud.find({}).sort({$natural:-1});
                 if (estado) {
                     solicitudes = solicitudes.filter((solicitud) => solicitud.estado === estado);
                } 

                if (tipoSolicitud){
                    solicitudes = solicitudes.filter((solicitud) => solicitud.tipoSolicitud === tipoSolicitud);
                }

                solicitudes = await search(solicitudes, ['usuario.nombre', 'usuario.apellido'], searchText);
                /* console.clear();
                console.log(solicitudes); */

                 
                return solicitudes;
                /* const hasMore = solicitudes.length > offset + limit;
                
                console.log(solicitudes.slice(offset, offset + limit))
                console.log(todasSolicitudes.length)
                console.log(hasMore)
                
                return {
                  solicitudes: solicitudes.slice(offset, offset + limit),
                  totalCount: todasSolicitudes.length,
                  hasMore,
                }; */

                
                //return solicitudes;
            } catch (error) {
                console.log(error);
            }
        },

        obtenerSolicitudesHistorial: async ()=>{ 
            try {
                const solicitudes = await Solicitud.find({
                    "estado":[3,5,6,7]  
                }).sort({$natural:-1}); 
                console.clear();
                console.log(solicitudes);
                return solicitudes;
            } catch (error) {
                console.log(error);
            }
        },

        //============================ Ubicaciones ==========================
        ubicacionTiempoReal: async ()=>{

            const clientes = await Conductor.aggregate([
               
                {$match: {activo:null} },
                { $lookup:{
                    from: "ubicacionconductors",
                    localField: "_id",
                    foreignField: "idConductor",
                    as:"ubicacion"
                }},
                {$limit:1}
                                  
   
            ]);

            console.log(clientes);

            return clientes;
        },
    
    },

    Subscription: {
        ubicacionConductores: {
            subscribe: () => pubsub.asyncIterator([POST_ADDED]),
        },
    },


    Mutation: {

        nuevoUbicacionConductor: async (_, {input},{pubsub} ) => {
            try {
                pubsub.publish(POST_ADDED, { nuevoUbicacionConductor: input });
                const resultado = await UbicacionConductor.save();
                return resultado; 
                /* const ubicacion = new UbicacionConductor(input);
                const resultado = await ubicacion.save();
                return resultado; */
            } catch (error) {
                console.log(error);
            }
        },

        //============================ Solicitudes ============================
        nuevaSolicitud:async (_, {input}) => {
            
            
            /* console.log('+++++++++++++++++++++++++');
            console.log('nuevaSolicitud',input);
            console.log('+++++++++++++++++++++++++'); */
            
            
            try {

                const solicitud = new Solicitud(input);

                /* console.log('/////////////////////////');
                console.log('solicitud',solicitud);
                console.log('/////////////////////////'); */

                const resultado = await solicitud.save();

                /* console.log('=========================');
                console.log('resultado',resultado);
                console.log('=========================');
 */
                return resultado;  

            } catch (error) { 
                console.log(error); 
            }
        },

        //============================ Vehiculo ============================
        nuevoVehiculo:async (_, {input}) => {
            
            console.log('-------------------------------'); 
            console.log('');
            console.log('Input del Vehiculos',input);
            console.log('');
            console.log('-------------------------------');
            
            try {

                const vehiculo = new Vehiculos(input);

                console.log('-------------------------------'); 
                console.log('');
                console.log('Vehiculo',vehiculo);
                console.log('');
                console.log('-------------------------------');

                const resultado = await vehiculo.save();

                console.log('-------------------------------'); 
                console.log('');
                console.log('resultado',resultado);
                console.log('');
                console.log('-------------------------------');

                return resultado;  

            } catch (error) {
                console.log(error);
                return '¡Ups Algo salio mál! Intentalo más tarde.';
            }
        },
        
        actualizarVehiculo: async (_, {id,input} ) => {

            //If exists product
            let vehiculo = Vehiculos.findById(id);

            if (!vehiculo) {
                throw new Error('Vehiculo no encontrado');
            }

            //Sava in database
            vehiculo = await Vehiculos.findOneAndUpdate({_id:id},input,{new:true});

            return vehiculo;
        },

        //============================ Conductor ============================}
        nuevoConductor:async (_, {input}) => {
            
            console.log('-------------------------------'); 
            console.log('');
            console.log('Input del Conductor',input);
            console.log('');
            console.log('-------------------------------');
            
            try {

                const conductor = new Conductor(input);

                console.log('-------------------------------'); 
                console.log('');
                console.log('Conductor',conductor);
                console.log('');
                console.log('-------------------------------');

                const resultado = await conductor.save();

                console.log('-------------------------------'); 
                console.log('');
                console.log('resultado',conductor);
                console.log('');
                console.log('-------------------------------');

                return resultado;  

            } catch (error) {
                console.log(error);
                return '¡Ups Algo salio mál! Intentalo más tarde.';
            }
        },
    },


}

module.exports =  resolvers;