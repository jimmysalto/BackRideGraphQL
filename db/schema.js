const { gql } = require('apollo-server');


//Schema

const typeDefs = gql`

    type Vehiculos { 
        id:                     ID 
        numeroPlaca:            String
        modeloVehiculo:         String
        marcaVehiculo:          String
        anio:                   Int
        numasignado:            Int
        estado:                 Boolean
        tipoVehiculo:           String
        cedulaPropietario:      String
        nombrePropietario:      String
        apellidoPropietario:    String
        emailPropietario:       String
        celularPropietario:     String
        conductores:            [ ConductorVehiculo ]
    }

    type ConductorVehiculo { 
        id:         ID
        cedula:     String
        celular:    String
        nombre:     String
        apellido:   String
        email:      String
    }

    type Conductor {
        id:                     ID
        numeroCelular:          String
        calificacion:           Int
        numeroLicencia:         String
        contadorIntentos:       Int
        fechaDeRegistro:        String
        ultimaActualizacion:    String
        activo:                 String
        vehiculo:               [Vehiculo] 
        codigoVerificacion:     Int
        v:                      Int
        fechaEnvioCodigo:       String
        apellido:               String
        correoElectronico:      String
        nombre:                 String
        token:                  String 
    }

    type Solicitud {
        id : ID
        fechaDeRegistro : String
        ultimaActualizacion : String
        estado : Int
        origenCliente : CoordenadaObjeto
        referenciaOrigen : String
        direccionOrigen : String
        destinoCliente : CoordenadaObjeto
        referenciaDestino : String
        direccionDestino : String
        tipoVehiculo : String
        mapaId : String
        tipoSolicitud: Int
        usuario: Usuario
        indetificadorSolicitud: String 
        conductor: Conductor        
    }

    type CoordenadaObjeto {
        type :          String, 
        coordinates :   [Coordenada]
    }

    type Usuario {
        nombre:         String, 
        apellido:       String, 
        numeroCelular:  String
    }

    type Vehiculo {
        tipo :           String
        modelo:          String
        placa:           String
        eliminadoLogico: Boolean
        estado:          Boolean
    }

    type UbicacionConductor {
        id :            ID
        coordenadas :   [Coordenada]
        idConductor:    ID 
        estado:         Int
        fechaHora:      String
    }

    type Coordenada {
        longitud :  Float
        latitud :   Float
    }

    
    input VehiculoInput{
        tipo:               String
        modelo:             String
        placa:              String
        eliminadoLogico:    Boolean
        estado:             Boolean
    }
    #Sino funciona colocar la v:
    input NuevoConductorInput {
        numeroCelular:          String
        calificacion:           Int
        numeroLicencia:         String
        contadorIntentos:       Int
        fechaDeRegistro:        String
        ultimaActualizacion:    String
        activo:                 String
        vehiculo:               [VehiculoInput] 
        codigoVerificacion:     Int 
        fechaEnvioCodigo:       String
        apellido:               String
        correoElectronico:      String
        nombre:                 String
        token:                  String 
    }

    input NuevaSolicitudInput{        
        estado :            String
        origenCliente :     CoordenadaAndTypeInput
        referenciaOrigen :  String
        direccionOrigen :   String
        referenciaDestino : String
        direccionDestino :  String
        tipoVehiculo :      String
        mapaId :            String
        tipoSolicitud:      Int
        usuario:            UsuarioInput
        indetificadorSolicitud: String     
    }

    input NuevoVehiculosInput{
        numeroPlaca:            String
        modeloVehiculo:         String
        marcaVehiculo:          String
        anio:                   Int
        numasignado:            Int
        estado:                 Boolean
        tipoVehiculo:           String
        cedulaPropietario:      String
        nombrePropietario:      String
        apellidoPropietario:    String
        emailPropietario:       String
        celularPropietario:     String
        conductores:            [ConductorVehiculosInput]
    }

    input CoordenadaAndTypeInput{
        type :          String,
        coordinates :   [Float]
    }
 

    input CordenadaInput{
        longitud :  Float
        latitud :   Float
    }

    input UbicacionConductorInput{
        coordenadas:    [CordenadaInput]
        idConductor:    ID 
        estado:         Int
    }
    
    input ConductorVehiculosInput {
        cedula:     String
        celular:    String
        nombre:     String
        apellido:   String
        email:      String
    }

    input UsuarioInput{
        nombre :        String
        apellido :      String
        numeroCelular : String
    }

    type ubicacionTiempoReal{
        conductor: Conductor
        ubicacion: [UbicacionConductor]       
    }

    type Subscription {
        ubicacionConductores: UbicacionConductor
    }

    type resultSolicitudes{
        solicitudes: [Solicitud] 
        totalCount:  Int
        hasMore:     Int   
    }

    type Query {

        #Vehiculos
        obtenerVehiculos:                   [Vehiculos]
        
        # Conductor
        obtenerConductores:                 [Conductor]

        # UbicacionConductor
        obtenerUbicacionesConductor:        [UbicacionConductor]  
        obtenerUbicacionConductor(id:ID!):  [UbicacionConductor]
              
        # Busquedas Avanzadas
        ubicacionTiempoReal:                [ubicacionTiempoReal]

        #Solicitud
        obtenerSolicitudes( limit:Int,offset:Int,estado:Int,tipoSolicitud:Int,searchText:String): [Solicitud]
        obtenerSolicitudesHistorial:        [Solicitud]
        obtenerSolicitud(id:ID!):           [Solicitud]
    }

    type Mutation{
        
        #Vehiculo 
        nuevoVehiculo(input:NuevoVehiculosInput):                Vehiculos
        actualizarVehiculo(id:ID!, input:NuevoVehiculosInput):   Vehiculos

        #Conductor 
        nuevoConductor(input:NuevoConductorInput):              Conductor

        #Ubicacion
        nuevoUbicacionConductor(input: UbicacionConductorInput):    UbicacionConductor

        #solicitudes
        nuevaSolicitud(input: NuevaSolicitudInput):    Solicitud

    }

    
`;

module.exports = typeDefs;