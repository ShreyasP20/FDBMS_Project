const divs = document.querySelectorAll('.clickable');
    divs.forEach(div => {
      div.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        // xhr.open('POST', '/Display');
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.send(JSON.stringify({ divId: div.id }));
        // window.location.href = '/Display';
        window.location.href='/Display?divId=' + div.id;
      });
    });
