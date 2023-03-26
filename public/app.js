const select = document.querySelector("#select");
const allSelect = document.querySelectorAll("select")
const form = document.querySelector("#form");
const newForm = document.querySelector("#newRes");
const pu_tb_body = document.querySelector(".polling-unit tbody")
const pur = document.querySelector(".pu-result");
const tb_head = document.querySelector(".pu-result thead");
const tb_body = document.querySelector(".pu-result tbody")
const tb_bodys = document.querySelector(".pu-result .sec")


const ul = document.querySelector(".ul");
const sec1 = document.querySelector(".polling-unit");
const sec2 = document.querySelector(".polling-unit-result");
const sec3 = document.querySelector(".add-result");

const msgContainer = document.querySelector(".msg_container")

console.log("nft working")
const showPollUnits = async () => {
    // msgContainer.innerHTML = `<p class="msg">Loading...</p>`;
    await fetch('http://localhost/oop-int/controller/pollunit.php')
    .then(response =>  response.json())
    .then(response => {  
       if(response.pollMsg){
        let datas = response.pollMsg;
            let output = [];
            
            datas.forEach((data, i) => {            
                let oup = `
                <tr id=${data[0]}>
                    <td>${data[2]}</td>
                    <td>${data[3]}</td>
                    <td>${data[4]}</td>
                    <td>${data[5]}</td>
                    <td>${data[6]}</td>
                </tr>
                `;
                output.push(oup)
            })
            output = output.join(" ");
            pu_tb_body.innerHTML = output;
       } else {
        console.log("There was an error");
       }
       
    }).catch(error => console.log(error));
}

const getLga = async () => {
    await fetch('http://localhost/oop-int/controller/lga.php')
    .then(response =>  response.json())
    .then(response => {  
       if(response.lgaMsg){
        const datas = response.lgaMsg;
        datas.map((data, i) => {
            let opt = document.createElement("option");
            opt.value = data[1]
            opt.innerHTML = data[2];
            return select.append(opt);
        })
       } else {
        console.log("There was an error");
       }
       
    }).catch(error => console.log(error));
}

const sendlgaid = async () => {
    let vale = new FormData(form);
    vale.forEach((value, key) => (vale[key] = value));
    
    await fetch("http://localhost/oop-int/controller/poll1.php", {
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'},
        method: "POST",
        body: JSON.stringify(vale),
    })
    .then((res) => {
        if(res.status === 200)
            return res.json();
    })
    .then(data => {
        if(data.pollMsg){
            let datas = data.pollMsg;
            let output = [];
            datas.forEach((data, i) => {            
                let oup = `
                <tr id=${data[0]} class="hide">
                    
                </tr>
                `;
                output.push(oup)
            })
            output = output.join(" ");
            tb_bodys.innerHTML = output;
            let tr_id = tb_bodys.querySelectorAll("tr");
            let id = [];
            tr_id.forEach(trid => {
                id.push(trid.id)
            });
            id = id.join(",");

            return fetch("http://localhost/oop-int/controller/poll2.php", {
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'},
                method: "POST",
                body: JSON.stringify({id: id})
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if(data.success) {
                    let datas = data.lgaMsg;
                    let output = [];
                    let e = select;
                    let text = e.options[e.selectedIndex].text;
                    
                    const in_data = [];
                    datas.forEach(data =>{
                        const info =  {
                            party: `${data[2]}`,
                            value: `${data[3]}` * 1
                            
                        };
                        return in_data.push(info);
                        
                    })

                    const res = Array.from(in_data.reduce((acc, {value, ...r}) => {
                    const key = JSON.stringify(r);
                    const current = acc.get(key) || {...r, value: 0};  
                    return acc.set(key, {...current, value: current.value + value});
                    }, new Map).values());

                    res.map(re => {
                        let oup = `
                        <tr id="id">
                            <td>${re.party}</td>
                            <td>${re.value}</td>
                            <td>${text}</td>
                        </tr>
                        `;
                        output.push(oup)
                    })
                    output = output.join("");
                    tb_body.innerHTML = output;  
                    
                } else {
                    console.log(data)
                    tb_body.innerHTML = `
                        <tr class="pu-error">
                            <td colspan="3">No polling Unit result for this Local Government Area</td>
                        </tr>
                    `;
                        }
            })
        } else{
            // console.log(data)
            tb_body.innerHTML = `
            <tr class="pu-error">
                <td colspan="3">No polling Unit result for this Local Government Area</td>
            </tr>
            `;
        }

        
    })
    .catch((err) => {
        console.log(err);
    });

    return tb_body;
}

showPollUnits();
getLga();

form.onsubmit = (e) => {
    e.preventDefault();
    sendlgaid();
}

ul.onclick = (e) => {
    let ct = e.target;
    if(ct.classList.contains("pu")){
        sec1.classList.remove("hide")
        sec2.classList.add("hide")
    } 
    else if(ct.classList.contains("pur")){
        sec2.classList.remove("hide")
        sec1.classList.add("hide")
    }
}