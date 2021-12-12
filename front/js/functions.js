//function Regex

function isNameValid(id,errorId){
    console.log(id.target.value)
    if(/^[a-z ,.'-]+$/i.test(id.target.value) || id.target.value ==''){
        document.getElementById(''+errorId+'').innerHTML = ''
    }
    else{
        document.getElementById(''+errorId+'').innerHTML = 'il y a une erreur veuillez réesayer'
    }
}
function isAdressValid(id,errorId){
    if (/^[\w ,.'-]+$/.test(id.target.value) || id.target.value ==''){
        document.getElementById(''+errorId+'').innerHTML = ''
    }
    else{
        document.getElementById(''+errorId+'').innerHTML = 'il y a une erreur veuillez réessayer'
    }
}
function isEmailValid(id,errorId){
    if (/^[\w .@]+$/.test(id.target.value) || id.target.value ==''){
        document.getElementById(''+errorId+'').innerHTML = ''
    }
    else{
        document.getElementById(''+errorId+'').innerHTML = 'il y a une erreur veuillez réessayer'
    }
}


function verificationName(id,errorId){
 document
    .getElementById(''+id+'')
    .addEventListener('input',function(e){
    isNameValid(e,''+errorId+'')
    });

}
function verificationAdress(id,errorId){
 document
    .getElementById(''+id+'')
    .addEventListener('input',function(e){
    isAdressValid(e,''+errorId+'')
    });
}
function verificationEmail(id,errorId){
    document
    .getElementById(''+id+'')
    .addEventListener('input',function(e){
    isEmailValid(e,''+errorId+'')
    });
}