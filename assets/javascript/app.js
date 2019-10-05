var config = {
  apiKey: "AIzaSyCxSKDhJtb2ukhNaC2XEZ9h9whmcqPP4PI",
  authDomain: "learning-firebase-fa9ce.firebaseapp.com",
  databaseURL: "https://learning-firebase-fa9ce.firebaseio.com",
  projectId: "learning-firebase-fa9ce",
  storageBucket: "learning-firebase-fa9ce.appspot.com",
  messagingSenderId: "303728185852",
  appId: "1:303728185852:web:1bb75ab28e9a6af2ab6279",
  measurementId: "G-BEZW3XJJ5Q"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  var trainName;
  var destination;
  var trainTime;
  var frequency = 0;
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-name-input").val().trim();
    trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format("h:mm:ss A");
    frequency = $("#frequency-input").val().trim();

    console.log(trainName);
    
    var newTrain = {
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
  
    database.ref().push(newTrain);

    // console.log(newTrain.trainName);
    // console.log(newTrain.destination);
    // console.log(newTrain.trainTime);
    // console.log(newTrain.frequency);
  
    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#destination-name-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    trainName = childSnapshot.val().trainName;
    destination = childSnapshot.val().destination;
    trainTime = childSnapshot.val().trainTime;
    frequency = childSnapshot.val().frequency;
  
    // console.log(trainName);
    // console.log(destination);
    // console.log(trainTime);
    // console.log(frequency);
  
    frequency = parseInt(frequency);
    trainTime = parseInt(trainTime);

    var remainingTime = moment().diff(moment.unix(trainTime), "minutes") % frequency;
    var minutesAway = frequency - remainingTime;
    var arrival = moment().add(minutesAway, "m").format("hh:mm A");

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(arrival),
      $("<td>").text(minutesAway),
    );

    $("#schedule").append(newRow);
  });