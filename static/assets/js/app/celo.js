'use strict'

window.onload = () => {

    const obj = {
        currency: 'NGN',
        country: 'ng'.toUpperCase()
    }

    query(".toggle-slideup", true).forEach(e => {
        e.onclick = function () {
            query(".slideup-container").style.display = "block";
            toggleSelect(query(this.attributes['target-list'].textContent))
        }
    })

    let dismiss = function(e) {
        toggleSelect(e.parentNode.parentNode);
        setTimeout(() => {
            query(".slideup-container").style.display = "none";
        },500);
    }

    // Dismiss container
    query('.dismiss-icon-container .dismiss', true).forEach(e => {
        e.onclick = () => dismiss(e)
    })
    let toggleSelect = function (e) {
        let findClass = Array.from(e.classList).indexOf("bing-select-show");
        if(findClass >= 1){
            e.classList.remove("bing-select-show");
            e.classList.add("bing-select-hide");
            e.style.display = "block";
            setTimeout(() => {
                e.style.display = "none";
            }, 500);
        } else {
            e.classList.add("bing-select-show");
            e.classList.remove("bing-select-hide");
            e.style.display = "block";
        }
    }


    let focus = (ele) => {
        query(ele, true).forEach(e => {
            e.onclick = function (){
                query(ele, true).forEach(e => {
                    e.style.backgroundColor = 'transparent';
                })
                this.style.backgroundColor = 'rgba(220,220,220,.3)';
            }
        })
    }


    let navigate = (ele, direction = 'next') => {
        query(ele, true).forEach((e, index ) => {
            e.onclick = function (){

                this.parentNode.parentNode.classList.add('d-none');
                let num = direction === 'next' ? index + 1: index;
                setTimeout(() => {
                    query('.payment-widget .step', true)[num].classList.remove('d-none');
                }, 30);

                if(direction === 'next'){
                    query('.payment-widget .step', true)[num].classList.add('bing-slide-right-on');
                    query('.payment-widget .step', true)[num].classList.remove('bing-slide-right-off');
                } else {
                    query('.payment-widget .step', true)[num].classList.add('bing-slide-right-off');
                    query('.payment-widget .step', true)[num].classList.remove('bing-slide-right-on');
                }

                //console.log(query(ele, true)[index + 1])
            }
        })
    }

    let hide = () => {
        query('.payment-option', true).forEach(e => {
            e.classList.add('d-none');
        });
    }

    hide();
    query('.listing .delivery-choice', true).forEach(e => {
        e.onclick = function (){
            hide();
            query(this.attributes['target-data'].textContent).classList.remove('d-none');
            query('.method-text').innerText = this.attributes['target-name'].textContent.toUpperCase();
            dismiss(e)
            obj['delivery_method'] = this.attributes['target-id'].textContent;
        }
    })

    query('.fiat-list .listing .listing-card', true).forEach(e => {
        e.onclick = function (){
            let country, currency = e.attributes['dest-currency'].textContent;
            country = e.attributes['dest-country'].textContent;
            obj['currency'] = currency;
            obj['country'] = country.toUpperCase();
            obj.country === 'NG' ? query('#account_name').readOnly = true : query('#account_name').readOnly = false;
            query('#dest_country').className = '';
            query('#account_name').value = '';
            query('#dest_country').classList.add(country)
            query('#dest_country').classList.add('icon');
            query('#dest_currency').innerText = currency;
            query('#get_bank_name').value = '';
            validateAccount(obj.country);
            initBanks();
            dismiss(e);
        }
    })

    query('.momo-list .listing .listing-card', true).forEach(e => {
        e.onclick = function (){
            query("#mobile_money_name").value = this.innerText;
            dismiss(e);
        }
    })

    let selectBank = () =>  {
        query('.bank-list .listing .listing-card', true).forEach(e => {
            e.onclick = function (){
                obj['bank_id'] = e.attributes['target-id'].textContent;
                query('#get_bank_name').value = this.innerText;
                dismiss(e);

            }
        })
    }

    let initBanks = () => {
        let req, data = {
            'country': obj.country,
            'csrfmiddlewaretoken': token
        };

        req = jsonRequest("POST", `request/json/banks/`, data);
        req.onload = function async(){
            if(isJSON(this.responseText)){
                let html, data = JSON.parse(this.responseText).data['data'];
                html = '';
                for(const key in data){
                    let code, json = data[key];
                    code = obj.country === "NG" ? json.cbn_code : json.code;
                    html += `
                    <div class="listing-card" target-id="${code}">
                        <span class="icon bank"></span>
                        <span>${json.name}</span>
                    </div>`;
                }
                query('.bank-json-listing').innerHTML = html;
                selectBank();
            } else {
                let error = 'Some data was not loaded correctly. Check your internet connection or refresh page.';
                tata.error("Error: 500", error);
            }

        }
    }

    let validateAccount = (country) => {

            if(country === "NG"){
                //query(".is_validate").readOnly = true;
                query("#account_num").addEventListener("input", (e) => {
                    let account_number = e.target.value;
                    obj['account_number'] = account_number;
                    if(account_number.length === 10 && obj.country === "NG" && obj['bank_id'] !== ""){

                        e.target.disabled = true;
                        let req, data = {
                            'account_number': e.target.value,
                            'bank_code': obj.bank_id,
                            'csrfmiddlewaretoken': token
                        };
                        req = jsonRequest("POST", `/request/json/account/`, data);
                        req.onload = function async() {
                            e.target.disabled = false;
                            if(isJSON(this.responseText)){
                                let name, response = JSON.parse(this.responseText).data;
                                name = response.account_name;
                                if(name !== undefined){
                                    query("#account_name").value = name;
                                }
                            } else {
                                let error = "A server error occurred while processing your request. Check your network or try again";
                                obj.error.push(error);
                                tata.error("Error: 500", error);
                            }
                        }
                    }

                });

            }
        }


    initBanks();
    validateAccount(obj.country);
    navigate('.payment-widget .step .previous-icon', 'prev');
    navigate('.payment-widget .step .transfer-continue-container .continue-pay');
    focus('.payment-widget .step .payment-method-listing .listing-card');

    query(".complete_payment").onclick = function () {
        // Example usage
        const recipientAddress = '0x8bA16fB3A8dA003083Fa7025fefd59006DBf6750';
        const transferAmount = 1; // Adjust the amount as needed
        this.disabled = true;
        // Send ERC20 tokens from MetaMask
        query(".slideup-container").style.display = "block";
        toggleSelect(query(this.attributes['target-list'].textContent))

        if(window.ethereum && window.ethereum.isMiniPay) {
            sendToken().catch((r) => {
                let num = query('.step', true).length -1;
                setTimeout(() => {
                    query('.payment-widget .step', true)[num].classList.remove('d-none');
                }, 30);
                query('.payment-widget .step', true)[num].classList.add('bing-slide-right-on');
                query('.payment-widget .step', true)[num].classList.remove('bing-slide-right-off');

                //query('.error-response-text').innerHTML = `<div class="p-4">${r.toString()}</div>`;
                alert(r)
            });
        } else {
            alert('MiniPay not injected');
        }

    }
}


