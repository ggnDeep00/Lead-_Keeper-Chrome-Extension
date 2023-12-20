

let myLeads=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
let ulEl=document.getElementById("ul-el")
let tabBtn=document.getElementById("save-tab")
// const inputValue=inputEl.value 
let deleteBtn=document.getElementById("delete-btn")
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))



if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})



// function render(leads){
   
//     let listitems =""
//     for(let i=0;i<leads.length;i+=1){
//         // ulEl.innerHTML+="<li>"+"<a href=" +  myLeads[i] + ">" + myLeads[i] + "</a>"+ "</li>";
//     //    listitems+="<li><a target='_blank' href='"+ myLeads[i] + "'>" + myLeads[i] + "</a></li>";
    
//     listitems+=`
//             <li>
//                <a target='_blank' href='${leads[i]}'>
//                ${leads[i]}
//                </a>
//             </li>
//             ` 
    
//             // &nbsp&nbsp<button id="delete">DELETE</button>  
//     // const li = document.createElement("li");
//     // const a = document.createElement("a");
//     // a.href = myLeads[i];
//     // a.textContent = myLeads[i];
//     // li.appendChild(a);  // ulEl.appendChild(li);   
//     }
//     ulEl.innerHTML=listitems
// }

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

function render(leads) {
  
    let listItems = "";

    for (let i = 0; i < leads.length; i += 1) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>&nbsp&nbsp
                <button class="delete-btn" data-index="${i}">DELETE</button>
            </li>
        `;
    }

    ulEl.innerHTML = listItems
}

document.getElementById("ul-el").addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        const index = event.target.getAttribute("data-index");
        deleteLead(index);
    }
})


function deleteLead(index) {
    // Retrieve leads from localStorage
    const leads = JSON.parse(localStorage.getItem("myLeads")) || [];

    // Remove the element at the specified index
    leads.splice(index, 1);

    // Save the updated leads back to localStorage
    localStorage.setItem("myLeads", JSON.stringify(leads));

    // Render the updated list
    render(leads);
}




inputBtn.addEventListener("click", function(){
    if(inputEl.value !=""){
    myLeads=JSON.parse(localStorage.getItem("myLeads")) || []
    myLeads.push(inputEl.value) 
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    inputEl.value=""
}
render(myLeads)
})
















