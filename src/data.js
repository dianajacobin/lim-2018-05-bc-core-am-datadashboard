//obtener data y *funciones* que obtienen y manipulan los datos

// Funciones Solicitadas
window.computeUsersStats = (users, progress, courses) => {

    //recorrer el array de users y a cada uno agregarle el atributo stats
    let userWithStats= users.map(function(user){ 
        
        user.stats = {
            percent: 0,
            exercises: {
                total: 0,
                completed: 0,
                percent: 0
            },
            reads: {
                total: 0,
                completed: 0,
                percent: 0
            },
            quizzes: {
                total: 0,
                completed: 0,
                percent: 0, 
                scoreSum: 0,
                scoreAvg: 0
            }
        };

        //variableslos totales
        let totalExercices = 0, totalReads = 0, totalQuizzes = 0;

        //variables para completed
        let completedExercices = 0, completedReads = 0, completedQuizzes = 0;

        let scoreSum = 0;

        //obtener el progreso del usuario desde el array progress
        let userProgress = progress[user.id];

        if(userProgress){

            // actualizar el objeto stats con los datos del progreso
            const sumaPercent = courses.reduce((suma, course) => {
                let userProgressCourses = userProgress[course];
                if(userProgressCourses){
                    return suma + userProgressCourses.percent;
                }
            },0);

            user.stats.percent = sumaPercent/courses.length;

            //actualizar exercises, reads y quizzes
            courses.map((course) => {

                if(!userProgress.hasOwnProperty(course)){
                    return;
                }

                if(userProgress[course].hasOwnProperty('units')){
                    const units = Object.keys(userProgress[course].units);

                    units.map((unit) => {
    
                        if(userProgress[course].units[unit].hasOwnProperty('parts')){
                            const parts = Object.keys(userProgress[course].units[unit].parts);
    
                            parts.map((part) => {
        
                                const newPart = userProgress[course].units[unit].parts[part];    
        
                                if(newPart.type === 'practice'){
                                    totalExercices++;
                                    if(newPart.completed == 1){
                                        completedExercices++;
                                    }

                                }else if(newPart.type === 'read'){
                                    totalReads++;

                                    if(newPart.completed == 1){
                                        completedReads++;
                                    }

                                }else if(newPart.type === 'quiz'){
                                    totalQuizzes++;

                                    if(newPart.completed == 1){
                                        completedQuizzes++;
                                        scoreSum = scoreSum + newPart.score;
                                    }                                    
                                }
        
                            });
                        }
    
                    });
                }

            });

            user.stats.exercises.total = totalExercices;
            user.stats.reads.total = totalReads;
            user.stats.quizzes.total = totalQuizzes;

            user.stats.exercises.completed = completedExercices;
            user.stats.reads.completed = completedReads;
            user.stats.quizzes.completed = completedQuizzes;

            user.stats.exercises.percent = Math.round((completedExercices/totalExercices)*100) ;
            user.stats.reads.percent = Math.round((completedReads/totalReads)*100) ;
            user.stats.quizzes.percent = Math.round((completedQuizzes/totalQuizzes)*100);
            
            user.stats.quizzes.scoreSum = scoreSum;
            user.stats.quizzes.scoreAvg = Math.round(scoreSum/completedQuizzes);
        }

        return user;
     });

     console.log('userWithStats: ',userWithStats);
    return userWithStats;
}

window.sortUsers = (users, orderBy, orderDirection ) => {

}

window.filterUsers = (users, search) => {

}

window.processCohortData = (options) => {

}