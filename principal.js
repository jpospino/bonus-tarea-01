const express = require('express');


const opciones =  {
    id : {demand  : true, alias : 'i'},
    nombre : {demand : true, alias: 'n'},
    cedula : {demand : true, alias : 'c'}
}


const argv = require('yargs')
            .command('*','imprime las opciones de cursos',{}, () => {
                let cursos = consultarCursos();

                imprimirCursos(cursos, 2000);
            })
            .command('inscribir','Realiza la preinscripción de un estudiante', opciones, (datosInscripcion) => {
                let cursos = consultarCursos();
                let cursoAPreinscribir = cursos.find(curso => curso.id == datosInscripcion.id);

                if(cursoAPreinscribir === undefined){
                    console.log('Ha ingresado el id de un curso que no existe');
                    imprimirCursos(cursos, 0);
                    return;
                } 

                let texto = `El estudiante ${datosInscripcion.nombre}, con número de cédula ${datosInscripcion.cedula} se ha matriculado al curso ${cursoAPreinscribir.nombre}.`;
                var app = express();

                app.get('/', function (req, res) {
                    res.send(texto);
                });

                app.listen(3000);

                
                /*require('fs').writeFile(`preinscripcion_CC_${datosInscripcion.cedula}Curso_${datosInscripcion.id}.txt`, texto, (err) => {
                    if(err)
                        console.log(`Ocurrió el seguiente error: ${err.message}`);
                    else
                    console.log(`Se ha creado el archivo.`);
                });*/
                
            }).argv;

async function imprimirCursos(cursos, sleepTime){
    for(let i = 0; i < cursos.length; i++) {
        console.log(`El curso se llama ${cursos[i].nombre}, tiene una duraciòn de ${cursos[i].duracion} horas y un valor de ${cursos[i].valor} pesos.`);
        await sleep(sleepTime);
    } 
};

function consultarCursos(){
    return require('./data/cursos').cursos;
}


function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

function incribirCurso(inscripcionInfo){
    console.log(JSON.stringify(cursos));
}
