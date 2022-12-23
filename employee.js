const addEmployeeBtn= document.getElementById("addBtn");
const entryForm= document.querySelector(".entryForm");
const empName=document.querySelector("#name");
const phNo=document.querySelector("#phNo");
const address=document.querySelector("#address");
const profile=document.querySelector("#profile");
const addBtn=document.querySelector("#btn");
const displayData=document.querySelector(".container");
const editBtnMain=document.querySelector("#btn1");
const fillFieldErr=document.querySelector(".fillFieldErr");
const addressFieldErr=document.querySelector(".addressFieldErr");
const phNoFieldErr=document.querySelector(".phNoFieldErr");
const nameFieldErr=document.querySelector(".nameFieldErr")

let data= window.localStorage.getItem('empDetail') ? JSON.parse(window.localStorage.getItem('empDetail')) : [];
let id= (window.localStorage.getItem('id')) ? window.localStorage.getItem('id') : 0;
let idOfData;

const pgUI=(Data)=>{

      Data.map((data,index)=>{
          console.log(`(${Number(data.phNo)})`)
        const html=`<div class="result">
            <div class="icon">
            <div class="editOpt1 editOpt" id="editOpt_${index}">
            <div class="btnDel">
                <button  id="btnDel" onclick="
                
                let data = JSON.parse(window.localStorage.getItem('empDetail'));
                                    let deleteItem = data.splice(${index},1);
                                    window.localStorage.setItem('empDetail',JSON.stringify(data));
                                    window.location.reload();
                                    ">delete</button>
            </div>
            <div class="editBtn">
                <button id="editBtn" onclick="document.querySelector('.entryForm').style.display='block';
                                              document.getElementById('editOpt_${index}').classList.add('editOpt');
                                              document.getElementById('editIcon_${index}').style.display='block' ;
                                              empName.value='${data.empName}';  
                                              phNo.value='${data.phNo}';
                                              document.getElementById('${data.sex}').checked=true;
                                              address.value='${data.address}';
                                              profile.value='${data.profile}';
                                              idOfData=${data.id};
                                              console.log(idOfData)
                                              addBtn.style.display='none';
                                              editBtnMain.style.display='block';
                                              ">edit</button>
            </div>
        </div>
            <i class="fa fa-pencil editIcon" id="editIcon_${index}" 
            onclick="
            document.getElementById('editIcon_${index}').style.display='none' ;
            document.getElementById('editOpt_${index}').classList.remove('editOpt')">
            </i>
            </div>
            <div class="profileP">
                <img src="${data.profile}"></img>
            </div>
            <div class="nameRes">${data.empName}</div>
            <div class="phNoRes">${data.phNo}</div>
            <div class="sexRes">${data.sex}</div>
        </div>`;
        displayData.insertAdjacentHTML("beforebegin",html);
      });
      
};

if(data!=[]){
    pgUI(data);
}

addBtn.addEventListener("click",()=>{
    phNoFieldErr.innerHTML="";
    nameFieldErr.innerHTML="";
    addressFieldErr.innerHTML="";
    let sex;
    if(document.querySelector("#male").checked){
        sex=document.querySelector("#male").value;
    }
    if(document.querySelector("#female").checked){
        sex=document.querySelector("#female").value;
    }
    if(document.querySelector("#others").checked){
        sex=document.querySelector("#others").value;
    }
    window.localStorage.setItem('id',++id);
    const empData={
        empName:empName.value,
        phNo:Number(phNo.value),
        address:address.value,
        sex:sex,
        profile:profile.value,
        id:window.localStorage.getItem('id')
    };

    if(sex && empName.value && phNo.value && profile.value && address.value){

        data.push(empData);
        window.localStorage.setItem('empDetail',JSON.stringify(data));
        pgUI(data);
        window.location.reload();
    }
    else{
        if(phNo.value===""||empName.value===""||address.value===""||phNo.value===""  && empName.value==="" && address.value===""||phNo.value==="" && empName.value===""||empName.value==="" && address.value===""||phNo.value==="" && address.value===""){
        if(phNo.value===""){
            phNoFieldErr.innerHTML="phNo is required*";
        }
        if(empName.value===""){
            nameFieldErr.innerHTML="employee name is required*";
        }
        if(address.value===""){
            addressFieldErr.innerHTML="address is required*";
        }
    }
    }
    
    
});

editBtnMain.addEventListener("click",()=>{
    phNoFieldErr.innerHTML="";
    nameFieldErr.innerHTML="";
    addressFieldErr.innerHTML="";
    addBtn.style.display='none';
    const editedId=idOfData;
    let sex;
    if(document.querySelector("#male").checked){
        sex=document.querySelector("#male").value;
    }
    if(document.querySelector("#female").checked){
        sex=document.querySelector("#female").value;
    }
    if(document.querySelector("#others").checked){
        sex=document.querySelector("#others").value;
    }
    const empUpdData={
        empName:empName.value,
        phNo:Number(phNo.value),
        address:address.value,
        sex:sex,
        profile:profile.value,
        id:editedId
    };
    if(empName.value && phNo.value && address.value)
    {
        const foundIndex=data.findIndex(e=>{
           return e.id==editedId;
        });
        console.log(empUpdData,"obj");
        console.log(foundIndex,"foundind");
        console.log(data[foundIndex]);
        data[foundIndex]=empUpdData;
        window.localStorage.setItem('empDetail',JSON.stringify(data));
        pgUI(data);
        window.location.reload(); 
    }
    else{
        // if(phNo.value==="" && empName.value==="" && address.value===""||phNo.value==="" && empName.value===""||empName.value==="" && address.value===""||phNo.value==="" && address.value==="")
        // {
        //     fillFieldErr.innerHTML="all * field is reqiured";
        // }
        if(phNo.value===""||empName.value===""||address.value===""||phNo.value===""  && empName.value==="" && address.value===""||phNo.value==="" && empName.value===""||empName.value==="" && address.value===""||phNo.value==="" && address.value===""){
        if(phNo.value===""){
            phNoFieldErr.innerHTML="phNo is required*";
        }
        if(empName.value===""){
            nameFieldErr.innerHTML="employee name is required*";
        }
        if(address.value===""){
            addressFieldErr.innerHTML="address is required*";
        }
    }
    }
    
});

addEmployeeBtn.addEventListener("click", ()=>{
   entryForm.style.display="block";
   editBtnMain.style.display="none";
   addBtn.style.display='block';
});
