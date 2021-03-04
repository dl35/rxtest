const fs = require('fs');
const path = require('path');


var express = require('express');
var router = express.Router();

var  dbtool = require('./dbtool'); 
//var config = require('../config');
var server = require('../app');

//console.log('****** path route is ', __dirname  ) ;
//console.log('****** process route is ', process.cwd()  ) ;


var maxDatas = 1000 ;


var infos =[
  { route: '/bdd/create', message: 'Create table and add datas'},
  { route: '/bdd/list', message: 'get all items'},
  { route: '/bdd/delete', message: 'delete all items'},
  { route: '/bdd/drop', message: 'remove table'},
  { route: '/bdd/books/create', message: 'Create table and add datas'},
  { route: '/bdd/books/list', message: 'get all items'},
  { route: '/bdd/books/delete', message: 'delete all items'},
  { route: '/bdd/books/drop', message: 'remove table'},
]


router.get('/', (req, res) => {
    res.render('bdd', { method : infos}  );
  })

/////////////////////////////////////////////////////////////////////////////////////////
// creation de la table prod.sports
router.get( '/create' , function(req, res , next) {
        //id, name, surname , discipline , date , duree
        var conn = undefined ;
        var query = "CREATE TABLE IF NOT EXISTS prod.sports  (id INT AUTO_INCREMENT PRIMARY KEY, sexe ENUM('F','M'),  firstname VARCHAR(255), lastname VARCHAR(255),  discipline ENUM('RUNNING','BIKE','SWIM'), duree INT , day DATETIME) " ;
        dbtool.connect(server.pool).then(con => {
           conn = con;
           return dbtool.doQuery(conn, query, [] );
         })
          .then(result => {
            query ="DELETE FROM prod.sports ";
            return dbtool.doQuery(conn, query, [] )})
          .then(result => {
            query ="INSERT INTO prod.sports (sexe, firstname, lastname, discipline, duree , day ) VALUES ?";
            var p = addDatas( maxDatas );
            return dbtool.doQuery(conn, query, [p] )})
          .then(result => {
           query ="SELECT count(*) as total FROM prod.sports ";
           return dbtool.doQuery(conn, query, [] )})
          .then(result =>  { 
           var nb = result[0].total ;
           conn.release();
           return res.json({ inserted:  nb  });
         }).catch(error => {
           if (conn) {
             conn.release();
           }
           return next( error );
          });
    })




////////////////////////////////////////////////////////////////////////////////////////////////////////////    
function  addDatas( maxDatas ) {
  
var datas = [];
const firstnameM = ["Jacob", "Michael", "Matthew", "Joshua", "Christopher", "Nicholas", "Andrew", "Joseph", "Daniel", "Tyler", "William", "Brandon", "Ryan", "John", "Zachary", "David", "Anthony", "James", "Justin", "Alexander", "Jonathan", "Christian", "Austin", "Dylan", "Ethan" ,"Benjamin", "Noah" ] ;
const firstnameF = ["Emily", "Hannah", "Madison", "Ashley", "Sarah", "Alexis", "Samantha", "Jessica", "Elizabeth", "Taylor", "Lauren", "Alyssa", "Kayla", "Abigail", "Brianna", "Olivia", "Emma", "Megan", "Grace", "Victoria", "Rachel", "Anna", "Sydney", "Destiny", "Morgan", "Jennifer", "Jasmine"];
const lastnameMF = ["Chung", "Chen", "Melton", "Hill", "Puckett", "Song", "Hamilton", "Bender", "Wagner", "McLaughlin", "McNamara", "Raynor", "Moon", "Woodard", "Desai", "Wallace", "Lawrence", "Griffin", "Dougherty", "Powers", "May", "Steele", "Teague", "Vick", "Gallagher", "Solomon", "Walsh", "Monroe", "Connolly", "Hawkins", "Middleton", "Goldstein", "Watts", "Johnston", "Weeks", "Wilkerson", "Barton", "Walton", "Hall", "Ross", "Chung", "Bender", "Woods", "Mangum", "Joseph", "Rosenthal", "Bowden", "Barton", "Underwood", "Jones", "Baker", "Merritt", "Cross", "Cooper", "Holmes", "Sharpe", "Morgan", "Hoyle", "Allen", "Rich", "Rich", "Grant", "Proctor", "Diaz", "Graham", "Watkins", "Hinton", "Marsh", "Hewitt", "Branch", "Walton", "O'Brien", "Case", "Watts", "Christensen", "Parks", "Hardin", "Lucas", "Eason", "Davidson", "Whitehead", "Rose", "Sparks", "Moore", "Pearson", "Rodgers", "Graves", "Scarborough", "Sutton", "Sinclair", "Bowman", "Olsen", "Love", "McLean", "Christian", "Lamb", "James", "Chandler", "Stout", "Cowan", "Golden", "Bowling", "Beasley", "Clapp", "Abrams", "Tilley", "Morse", "Boykin", "Sumner", "Cassidy", "Davidson", "Heath", "Blanchard", "McAllister", "McKenzie", "Byrne", "Schroeder", "Griffin", "Gross", "Perkins", "Robertson", "Palmer", "Brady", "Rowe", "Zhang", "Hodge", "Li", "Bowling", "Justice", "Glass", "Willis", "Hester", "Floyd", "Graves", "Fischer", "Norman", "Chan", "Hunt", "Byrd", "Lane", "Kaplan", "Heller", "May", "Jennings", "Hanna", "Locklear", "Holloway", "Jones", "Glover", "Vick", "O'Donnell", "Goldman", "McKenna", "Starr", "Stone", "McClure", "Watson", "Monroe", "Abbott", "Singer", "Hall", "Farrell", "Lucas", "Norman", "Atkins", "Monroe", "Robertson", "Sykes", "Reid", "Chandler", "Finch", "Hobbs", "Adkins", "Kinney", "Whitaker", "Alexander", "Conner", "Waters", "Becker", "Rollins", "Love", "Adkins", "Black", "Fox", "Hatcher", "Wu", "Lloyd", "Joyce", "Welch", "Matthews", "Chappell", "MacDonald", "Kane", "Butler", "Pickett", "Bowman", "Barton", "Kennedy", "Branch", "Thornton", "McNeill", "Weinstein", "Middleton", "Moss", "Lucas", "Rich", "Carlton", "Brady", "Schultz", "Nichols", "Harvey", "Stevenson", "Houston", "Dunn", "West", "O'Brien", "Barr", "Snyder", "Cain", "Heath", "Boswell", "Olsen", "Pittman", "Weiner", "Petersen", "Davis", "Coleman", "Terrell", "Norman", "Burch", "Weiner", "Parrott", "Henry", "Gray", "Chang", "McLean", "Eason", "Weeks", "Siegel", "Puckett", "Heath", "Hoyle", "Garrett", "Neal", "Baker", "Goldman", "Shaffer", "Choi", "Carver", "Shelton", "House", "Lyons", "Moser", "Dickinson", "Abbott", "Hobbs", "Dodson", "Spencer", "Burgess", "Liu", "Wong", "Blackburn", "McKay", "Middleton", "Frazier", "Reid", "Braswell", "Steele", "Donovan", "Barrett", "Nance", "Washington", "Rogers", "McMahon", "Miles", "Kramer", "Jennings", "Bowles", "Brown", "Bolton", "Craven", "Hendrix", "Nichols", "Saunders", "Lehman", "Sherrill", "Cash", "Pittman", "Sullivan", "Whitehead", "Mack", "Rice", "Ayers", "Cherry", "Richmond", "York", "Wiley", "Harrington", "Reed", "Nash", "Wilkerson", "Kent", "Finch", "Starr", "Holland", "Glover", "Clements", "Schultz", "Hawley", "Skinner", "Hamrick", "Winters", "Dolan", "Turner", "Beatty", "Douglas", "Byrne", "Hendricks", "Mayer", "Cochran", "Reilly", "Jensen", "Yates", "Haynes", "Harmon", "Matthews", "Dawson", "Barefoot", "Kaplan", "Gross", "Richmond", "Pope", "Pickett", "Schwartz", "Singleton", "Ballard", "Spivey", "Denton", "Huff", "Mangum", "Berger", "McCall", "Pollard", "Garcia", "Wagner", "Crane", "Wolf", "Crane", "Dalton", "Diaz", "Currin", "Stanton", "Carey", "Li", "Chan", "Hess", "Robinson", "Mills", "Bender", "McDonald", "Moore", "Fox", "Lanier", "Harris", "Underwood", "Parsons", "Vaughn", "Banks", "Sherrill", "Oakley", "Rubin", "Maynard", "Hill", "Livingston", "Lam", "Thompson", "Creech", "Dillon", "Foster", "Starr", "Roy", "Barbour", "Burke", "Ritchie", "Odom", "Pearce", "Rosenberg", "Garrett", "O'Connor", "Cates", "McIntosh", "Olson", "Cox", "Erickson", "Chang", "Briggs", "Klein", "Goldberg", "Hinson", "Weiss", "Pritchard", "Goldman", "Lassiter", "Massey", "Stark", "Dunlap", "Humphrey", "Singleton", "Horowitz", "Lutz", "Hoover", "Kang", "Melton", "Teague", "Ellington", "Cherry", "Jennings", "Creech", "Lynn", "Albright", "Alston", "Burnette", "O'Neal", "Morris", "Lutz", "Callahan", "Conway", "Harvey", "Watson", "Glover", "Savage", "Henson", "Wang", "Ellis", "Barbour", "Sherrill", "Pierce", "Woodward", "Godfrey", "Langston", "Eaton", "Lowe", "Stanton", "Fuller", "Simmons", "Schultz", "Knight", "Klein", "Garcia", "Schroeder", "Hess", "Gold", "Hensley", "Turner", "French", "Hughes", "Pate", "Burnett", "Francis", "Horn", "Forrest", "Levin", "Weiner", "Durham", "Guthrie", "Hensley", "Freedman", "Wiggins", "Best", "Beatty", "Crawford", "Drake", "Curtis", "Walter", "Dunlap", "Jenkins", "Hood", "Ellis", "Jiang", "Johnson", "Craig", "Norman", "McIntyre", "Brantley", "Kelley", "Smith", "Lyons", "Wall", "Quinn", "Hicks", "Garrison", "Watts", "Dickerson", "Waller", "Carter", "Robinson", "Katz", "Hull", "Bowling", "Brantley", "Brock", "James", "McMillan", "Hu", "Waller", "Abbott", "McKee", "Waters", "Sims", "Henderson", "Rao", "Bray", "Scarborough", "Ford", "Blum", "Kenney", "Gordon", "Blair", "Moore", "Kemp", "Hutchinson", "Brennan", "Little", "Gill", "Keller", "Rosenthal", "McConnell", "Sawyer", "McCall", "Coates", "Hicks", "Davidson", "Hawkins", "Lindsay", "Gonzalez", "Gray", "English", "Duke", "Webb", "Baldwin", "Lamb", "Shaffer", "Wang", "Burgess", "Smith", "Fletcher", "Boyd", "Hirsch", "Currie", "McKenzie", "Weber", "Honeycutt", "Manning", "Bolton", "Ritchie", "Baldwin", "Riley", "Swanson", "Huffman", "Gibson", "Yates", "Wrenn", "Green", "Harris", "Hayes", "Hamrick", "Hawley", "Koch", "McKenzie", "Harrell", "Parsons", "McGuire", "Stephenson", "Baxter", "Summers", "Welch", "Nixon", "Kelly", "Sumner", "Cobb", "Bruce", "Newton", "Rogers", "Sanchez", "Finch", "Silverman", "Horn", "Richardson", "Gay", "Chase", "Gallagher", "Kern", "Scott", "Bradley", "Puckett", "Sanchez", "Yang", "Brantley", "Bunn", "Link", "Nguyen", "Stephens", "Horne", "Burton", "Diaz", "Berry", "Knowles", "Freeman", "Hernandez", "Roach", "Hardison", "Wolf", "Boyd", "Caldwell", "Mann", "McLeod", "Stanton", "Park", "Chang", "Newton", "Phillips", "Whitaker", "Pitts", "McLean", "Barton", "Gould", "Atkins", "Shapiro", "Vincent", "Harrell", "Boswell", "Lassiter", "Fisher", "Case", "Parsons", "McPherson", "Wiley", "Schwartz", "McFarland", "Baker", "Holden", "Hartman", "Schwartz", "Nguyen", "Houston", "Friedman", "Adcock", "Stephens", "McClure", "Proctor", "Lang", "Berger", "Aldridge", "Davies", "Wall", "Miles", "Bolton", "Morgan", "Fisher", "Stephens", "Holmes", "Ferrell", "Henry", "Hedrick", "Horne", "Weiss", "Singh", "Blalock", "Aldridge", "Ritchie", "Grossman", "Pugh", "Olson", "Fernandez", "Arnold", "Stanley", "Field", "Farmer", "Jernigan", "Bowers", "Crabtree", "Crabtree", "Clements", "Spivey", "Archer", "Owen", "Strickland", "Berg", "Gibbons", "Warner", "Bray", "Eason", "Hoover", "Park", "Anderson", "Li", "Elmore", "Pearson", "Harper", "Chu", "Schultz", "Black", "Mitchell", "Sharp", "Glover", "Cates", "Martin", "Lowry", "Cooke", "Fink", "Barrett", "Olson", "Melton", "Coley", "Mueller", "Paul", "Daniel", "Padgett", "Daniels", "Hayes", "Hines", "Pridgen", "Stone", "Hayes", "Harris", "Walter", "Woods", "Jennings", "Lopez", "McCarthy", "Frederick", "Lopez", "Scarborough", "Brandt", "Nolan", "Chandler", "Carlton", "Katz", "Parrott", "Corbett", "Godfrey", "Cooke", "Pate", "Barber", "Fletcher", "Schroeder", "Lindsay", "Boswell", "Buckley", "Harmon", "Walters", "Stevens", "Knight", "Rowland", "Lindsay", "Bowling", "Kirby", "Benson", "Anthony", "Dunn", "Hill", "Lang", "Grimes", "Bowers", "Bowden", "Underwood", "Zhang", "Godwin", "Rice", "Townsend", "Lin", "Pitts", "Koch", "Callahan", "Long", "Norton", "Blackburn", "O'Connell", "Bowling", "Robinson", "Pritchard", "Lawson", "Dickerson", "Livingston", "Hansen", "Berman", "Carroll", "Kearney", "Peterson", "Richards", "Sutherland", "McCormick", "Beach", "Wu", "Hunt", "Carver", "Anthony", "Livingston", "Floyd", "McCall", "Haynes", "Gunter", "Solomon", "Harris", "Cline", "McKay", "Braun", "Preston", "Hayes", "Burnette", "Finch", "Levine", "Lynch", "Simpson", "Galloway", "Dickson", "Murphy", "Cannon", "Fleming", "Hanson", "Blackwell", "Zimmerman", "Dyer", "Greenberg", "Quinn", "Sullivan", "Stanley", "Hendrix", "Barber", "High", "Pickett", "Copeland", "Beck", "McKenna", "King", "Stone", "Benton", "Boyette", "Byers", "Cook", "Nixon", "Mayo", "Hardison", "Marks", "Ball", "Kirk", "Cooke", "Sutton", "Gibson", "Haynes", "Klein", "Tyson", "Payne", "Francis", "Roth", "Nixon", "Coble", "Walters", "Hewitt", "Langley", "Scott", "Willis", "Denton", "Daly", "Lam", "Fox", "Franklin", "McIntosh", "Tyler", "Hanna", "Davenport", "Barton", "Chambers", "Thomas", "Arthur", "Law", "Coley", "Vaughn", "Case", "Reed", "Hardy", "Beatty", "Dale", "Russell", "Whitley", "Curry", "McNeill", "Franklin", "Lindsay", "Casey", "Meadows", "Casey", "Love", "Fitzpatrick", "Mann", "Knowles", "Hale", "Carlson", "Barefoot", "Warren", "Nelson", "Lancaster", "Kay", "Burgess", "Fitzpatrick", "Davies", "Moran", "Ashley", "Caldwell", "Kelley", "Mack", "Reilly", "Copeland", "Love", "Conrad", "Padgett", "Poole", "McKinney", "Sawyer", "Dalton", "Carey", "Stuart", "Bowles", "Singleton", "Britt", "Owens", "Davenport", "Cox", "Barton", "Cooke", "Tilley", "Pugh", "Schultz", "Connor", "Herbert", "Aycock", "Barry", "Bishop", "Garrett", "Bailey", "Riddle", "Sawyer", "Burnett", "Boyette", "McKenzie", "Sinclair", "Cannon", "Freeman", "Wallace", "Gilbert", "McNamara", "Mullen", "Bradshaw", "Hinson", "Jordan", "Berger", "Upchurch", "Bowers", "Allison", "Alexander", "Coley", "Riley", "O'Brien", "Vaughan", "Hartman", "Chung", "Fischer", "Sellers", "Montgomery", "Snow", "McKnight", "McMahon", "Chu", "Crews", "Sharma", "Puckett", "Pappas", "Sharpe", "Olson", "Desai"];
disciplineA = ['RUNNING','BIKE','SWIM'];
runningA=['30','45','60','75','90'] ;
bikeA=['60','75','90','120','150'] ;
swimA=['60','75','90','120'] ;

var i;
for (i = 0; i < maxDatas ; i++) {

     var tmp =[]; 

    if( i % 2 == 0 ) {
        tmp[0] = 'F' ;
        var pos= myrandom( firstnameF.length ) ;
        var firstname= firstnameF[pos] ;
        tmp[1]  = firstname ;
    } else {
        tmp[0] = 'M' ;
        var pos= myrandom( firstnameM.length ) ;
        var firstname= firstnameM[pos] ;
        tmp[1]  = firstname ;
    }
        pos= myrandom( lastnameMF.length ) ;
        var lastname= lastnameMF[pos] ;
        tmp[2]  = lastname ;
        pos= myrandom( disciplineA.length ) ;
        var discipline= disciplineA[pos] ;
        tmp[3]  = discipline ;



        if ( discipline == 'RUNNING ') {
          pos= myrandom( runningA.length ) ;
          var duree= runningA[pos] ;
        } else if ( discipline == 'BIKE ' ) {
          pos= myrandom( bikeA.length ) ;
          var duree= bikeA[pos] ;
        } else {
          pos= myrandom( swimA.length ) ;
          var duree= swimA[pos] ;
        }
        tmp[4]  = duree ;
        var day = randomDate(new Date(2020, 0, 1), new Date())
        tmp[5] =  day ;
        datas.push( tmp ) ;
       

}


// sexe , firstname, lastname, discipline, duree , date;
return datas ;

}  

/////////////////////////////////////////////////////////////
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

/////////////////////////////////////////////////////////////
function myrandom( size ) {
  // returns a random integer from 0 to size 
  return Math.floor(Math.random() * size );
}

/////////////////////////////////////////////////////////////

router.get( '/drop' , function(req, res , next) {
  //id, name, surname , discipline , date , duree
  var conn = undefined ;
  var query = "DROP TABLE prod.sports " ;
  dbtool.connect(server.pool).then(con => {
     conn = con;
     return dbtool.doQuery(conn, query, [] );
   }).then(result =>  { 
     conn.release();
     return res.json({ drop:  true  });
   }).catch(error => {
     if (conn) {
       conn.release();
     }
     return next( error );
    });
})
/////////////////////////////////////////////////////////////

router.get( '/list' , function(req, res , next) {
  //id, name, surname , discipline , date , duree
  var conn = undefined ;
  var query = "SELECT * FROM  prod.sports " ;
  dbtool.connect(server.pool).then(con => {
     conn = con;
     return dbtool.doQuery(conn, query, [] );
   }).then(result =>  { 
     conn.release();
     return res.json( result );
   }).catch(error => {
     if (conn) {
       conn.release();
     }
     return next( error );
    });
})
///////////////////////////////////////////////////////////////////
router.get( '/delete' , function(req, res , next) {
  //id, name, surname , discipline , date , duree
  var conn = undefined ;
  var query = "DELETE FROM prod.sports " ;
  dbtool.connect(server.pool).then(con => {
     conn = con;
     return dbtool.doQuery(conn, query,[] );
   }).then(result =>  { 
     conn.release();
     return res.json({ delete:  true  });
   }).catch(error => {
     if (conn) {
       conn.release();
     }
     return next( error );
    });
})
///////////////////////////////////////////////////////////////////
router.get( '/books/delete' , function(req, res , next) {
  //id, name, surname , discipline , date , duree
  var conn = undefined ;
  var query = "DELETE FROM prod.books " ;
  dbtool.connect(server.pool).then(con => {
     conn = con;
     return dbtool.doQuery(conn, query,[] );
   }).then(result =>  { 
     conn.release();
     return res.json({ delete:  true  });
   }).catch(error => {
     if (conn) {
       conn.release();
     }
     return next( error );
    });
})

/////////////////////////////////////////////////////////////

router.get( '/books/drop' , function(req, res , next) {
  //id, name, surname , discipline , date , duree
  var conn = undefined ;
  var query = "DROP TABLE prod.books " ;
  dbtool.connect(server.pool).then(con => {
     conn = con;
     return dbtool.doQuery(conn, query, [] );
   }).then(result =>  { 
     conn.release();
     return res.json({ drop:  true  });
   }).catch(error => {
     if (conn) {
       conn.release();
     }
     return next( error );
    });
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// creation de la table prod.sports
router.get( '/books/create' , function(req, res , next) {
  

  var books = loadBooks();

  var conn = undefined ;
  var query = "CREATE TABLE IF NOT EXISTS prod.books  (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), isbn INT, pagecount INT, url VARCHAR(255), description VARCHAR(255), status VARCHAR(15), authors VARCHAR(255), publish DATETIME )" ;
  dbtool.connect(server.pool).then(con => {
     conn = con;
     return dbtool.doQuery(conn, query, [] );
   })
    .then(result => {
      query ="DELETE FROM prod.books ";
      return dbtool.doQuery(conn, query, [] )})
    .then(result => {
      query ="INSERT INTO prod.books (title, isbn, pagecount, publish, url, description, status, authors) VALUES ?";
      return dbtool.doQuery(conn, query, [books] )})
    .then(result => {
     query ="SELECT count(*) as total FROM prod.books ";
     return dbtool.doQuery(conn, query, [] )})
    .then(result =>  { 
     var nb = result[0].total ;
     conn.release();
     return res.json({ inserted:  nb  });
   }).catch(error => {
     if (conn) {
       conn.release();
     }
     return next( error );
    });
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadBooks(){
  var values = [];
  var max = 100; 
  fs.readFile(path.join(__dirname, '/datas/books.json') , (err, data) => {
    if (err) throw err;
    let books = JSON.parse(data);
    
    var i = 0 ;
    books.forEach(obj => {
      if( values.length ===  max ) {
        return;
      }
      

      const v = [] ;
      Object.entries(obj).forEach(([key, value]) => {
            if( key === 'authors' ) {
               value= value.join();
            }

          if( key !== 'categories' &&  key !== 'longDescription'  ) {
           v.push(value);
          }
      });
     
          if( v.length == 8 ) {
            values.push( v ) ;
                   }
     
    
  });
  
  

});

//console.log( values );
return values ;
}
/////////////////////////////////////////////////////////////

router.get( '/books/list' , function(req, res , next) {
  //id, name, surname , discipline , date , duree
  var conn = undefined ;
  var query = "SELECT * FROM  prod.books " ;
  dbtool.connect(server.pool).then(con => {
     conn = con;
     return dbtool.doQuery(conn, query, [] );
   }).then(result =>  { 
     conn.release();
     return res.json( result );
   }).catch(error => {
     if (conn) {
       conn.release();
     }
     return next( error );
    });
})
///////////////////////////////////////////////////////////////////
router.delete( '/books/delete' , function(req, res , next) {
  //id, name, surname , discipline , date , duree
  var conn = undefined ;
  var query = "DELETE FROM prod.books " ;
  dbtool.connect(server.pool).then(con => {
     conn = con;
     return dbtool.doQuery(conn, query,[] );
   }).then(result =>  { 
     conn.release();
     return res.json({ delete:  true  });
   }).catch(error => {
     if (conn) {
       conn.release();
     }
     return next( error );
    });
})

module.exports = router;