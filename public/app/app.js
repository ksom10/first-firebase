var _db;

function initFirebase(){
    firebase.auth().signInAnonymously()
  .then(() => {
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    _db = [];
  });
  _db = firebase.firestore();
   
}


function initListeners(){
    $(".hipHop").click(function (e){
        $("#display").html("");
        _db
        .collection("Albums")
        .where("genre" , "==" , "Hip-hop")
        .get()
        .then(
            function (querySnapshot){
            querySnapshot.forEach(function (doc){
                getAlbum(doc);
            });
        });
    });

    $(".rock").click(function (e){
        $("#display").html("");
        _db
        .collection("Albums")
        .where("genre" , "==" , "Rock")
        .get()
        .then(
            function (querySnapshot){
            querySnapshot.forEach(function (doc){
                getAlbum(doc);
            });
        });
    });

    $(".pop").click(function (e){
        $("#display").html("");
        _db
        .collection("Albums")
        .where("genre" , "==" , "Pop")
        .get()
        .then(
            function (querySnapshot){
            querySnapshot.forEach(function (doc){
                getAlbum(doc);
            });
        });
    });

    $(".reset").click(function (e){
        $("#display").html("");
        _db
        .collection("Albums")
        .get()
        .then(
            function (querySnapshot){
            querySnapshot.forEach(function (doc){
                getAlbum(doc);
            });
        });
    });


   /*  $(".submitBtn").click(function (e) {
        let an = $("#aName").val();
        let art = $("#artist").val();
        let gen = $("#genre").val();
        let anObj = {"aName": an, "artist": art, "genre": gen};


        _db
        .collection("Albums")
        .add(anObj)
        .then(function(doc){
            console.log("added doc " + doc.id);
        }, function(error){
            console.log("error ", error);
        });

        $("#aName").val("");
        $("#artist").val("");
        $("#genre").val("");

    }); */

 /*    $(".getBtn").click(function (e) {
        _db
        .collection("Albums")
        .get()
        .then(
            function (querySnapshot){
            querySnapshot.forEach(function (doc){
                dataObj= doc.data();
                console.log(dataObj);
            });
        });
    })
} */
}

function getAlbum(doc){
    $("#display").append(`
    <div class = "albums">
    <div class="cover" style="background-image: url(${doc.data().photo})"></div>
        <h1>${doc.data().aName}</h1>
        <h3>${doc.data().genre}</h3>
        <h3>${doc.data().artist}</h3>
        </div>
    `);
}

function getData(){
    _db
    .collection("Albums")
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            dataObj = doc.data();
            console.log(dataObj)
            $("#display").append(`
            <div class = "albums">
            <div class="cover" style="background-image: url(${doc.data().photo})"></div>
            <h1>${doc.data().aName}</h1>
            <h3>${doc.data().artist}</h3>
            <h3>${doc.data().genre}</h3>
            
            </div>`)
        })
    })
}



$("document").ready(function () {
    try {
        initFirebase();
        initListeners();
        getData();
        
        
    } catch {
        console.error("error");
    }
});