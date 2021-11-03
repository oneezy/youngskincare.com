import {validateEmail} from '../../_includes/utils/utils.js';

export default function discount() {
  let html = document.querySelector('html');

  if (document.getElementById('discountControls') && sessionStorage.getItem('firstTime') === null) {
    // real elements (hidden)
    let realForm    = document.querySelector('#MainForm');
    let realImg = document.querySelector('#discountControls > div > img');
    let realText = document.querySelector('#discountControls > div').innerText.trim();
    let realInput = document.querySelector('#discountControls > input[type=text]');
    let realSubmit = document.querySelector('#discountControls > input[type=submit]');

    // elements
    let dialog  = document.querySelector('#dialog');
    let img     = document.querySelector('#discountImg');
    let title   = document.querySelector('#discountText');
    let percent = document.querySelector('#discountPercent');
    let email   = document.querySelector('#discountEmail');
    let button  = document.querySelector('#discountButton');
    let code    = document.querySelector('#thankyouCode');
    let faux    = document.querySelector('#faux');

    // new text
    let discountText    = realText.replace(/\([^)]+\)/g, '').trim();
    let discountCode    = realText.match(/\(([^)]+)\)/g).toString().replace(/\(|\)/g, '').trim();
    let discountPercent = realText.match(/\d+%/g).toString().trim();
    

    function showDiscount() {
      setTimeout(() => {
        html.classList.add('dialog', 'active', 'dialog--image');
      }, 3000);
    }

    // function disableForm() {
    //   realForm.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //   });
    // }

    function replaceContent() {
      realImg.setAttribute('alt', `Save ${discountPercent}`);
      img.appendChild(realImg).classList.add('object-cover', 'h-full', 'lg:h-full', 'w-full');
      title.innerText = `Save ${discountPercent}`;
      percent.innerText = discountPercent;
      code.value = discountCode;
    }

    function checkEmail() {
      let dialog = document.getElementById('dialog');
      let email = document.getElementById('discountEmail');
      let button = document.getElementById('discountButton');

      if (validateEmail(email.value)) {
        button.disabled = false;
        dialog.classList.add('discount--success');
      } 
      else {
        button.disabled = true;
        dialog.classList.remove('discount--success');
      }
    }
    
    // write a function that uses the clipboard API to copy the code to the clipboard
    function copyCode() {
      let code = document.getElementById("thankyouCode");
      let value = code.value;
      let message = document.getElementById("thankyouMessage");
      
      code.addEventListener("click", () => {
        navigator.clipboard.writeText(value).then(() => {
          message.classList.add('text-sky-300')
          message.innerText = "Copied!";
        })
      });
    }

    function submitEmail() {
      document.addEventListener('click', async (e) => {
        let close = e.target.closest('.discount--thankyou [data-dialog-close]');
        if (close) {
          // realSubmit.click();
          realForm.submit();
        }
      });
    }

    function firstTime() {
      document.addEventListener('click', async (e) => {
        let close = e.target.closest('[data-dialog-close]');
        if (close) {
          sessionStorage.setItem('firstTime', 'false');
        }
      });
    }

    function thankyou() {
      dialog.classList.remove('discount--success');
      dialog.classList.add('discount--thankyou');
    }

    function showThankYou() {
      let dialog = document.getElementById('dialog');
      let button = document.getElementById('discountButton');
      let email = document.getElementById('discountEmail');

      button.addEventListener('click', async (e) => {
        e.preventDefault();
        thankyou();
      });

      email.addEventListener('keyup', async (e) => {
        realInput.value = email.value;
        checkEmail();

        if (e.keyCode === 13 && button.disabled === false) {
          thankyou();
        }
      });
    }

    // function realClick() {
    //   realSubmit.addEventListener('click', async (e) => {
    //     console.log('form submitted');
    //   });
    // }

    showDiscount();
    // disableForm();
    replaceContent();
    firstTime();
    showThankYou();
    copyCode();
    submitEmail();
    // realClick();

  }
}