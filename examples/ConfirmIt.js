module.exports = ConfirmIt ;

var Prompt=require('prompt'),
    sys=require('sys');

// following variables could easily substituted by args
var timeout=6,
    confirmText = 'I DO!';

var exitTimer, warningTimer; 
function timeBomb(sec){
  exitTimer= setTimeout(function(){
    //I put a new
    process.stdout.write('\n');
    console.log(timeout + ' seconds timeout expired.');
    console.log("Script STOPS HERE! >:(");
    process.exit(1);
  },(sec+1)*1000);

  // print priodically a timeout log of the time passing by
  // var timeGone = 0,
  //     warningLoop = 2;
  // process.stdout.write("0s");
  // warningTimer = setInterval(function(){
  //   process.stdout.write(".." + (timeGone += warningLoop) + "s");
  // },warningLoop*1000);
}

function stopTimeBomb(userInput,confirmText){
  if ( userInput == confirmText ){
    console.log('userInput «' + userInput + '» == confirmText «' + confirmText +'»');
    console.log('Script GOES ON! \\o/');
    if (confirmText) {clearTimeout(exitTimer)};
    if (warningTimer) {clearInterval(warningTimer)};
  } else {
    console.log('userInput «' + userInput + '» != confirmText «' + confirmText +'»');
    console.log("Script STOPS HERE! >:(");
    if (confirmText) {clearTimeout(exitTimer)};
    if (warningTimer) {clearInterval(warningTimer)};
    process.exit(1);
  }
}

function ConfirmIt() {
  process.stdout.write('If you want to continue, pls write "' + confirmText + '" without quotes before ' + timeout + ' seconds');
  Prompt()
    .tap(function(){timeBomb(timeout)})
    .ask('','user')
    .tap(function(input){stopTimeBomb(input.user.trim(),confirmText)})
    .end();
}