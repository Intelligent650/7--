function edit(id) {
  const fio = $('#fio').val();
  const age = $('#age').val();
  const date = $('#date').val();

  fetch('http://localhost:8000/guide/'+id.toString(), {
    method: 'PUT',
    body: JSON.stringify({
      fio: fio,
      age: age,
      date: date
    }),
    headers: { 'Content-Type': 'application/json' }
  }).then(function () {
    window.location.reload();
  })
}

function remove(id) {
  fetch('http://localhost:8000/guide/'+id.toString(), {
    method: 'DELETE'
  }).then(function(){
    window.location.reload();
  })
}

function add() {
  const fio = $('#fio').val();
  const age = $('#age').val();
  const date = $('#date').val();

  fetch('http://localhost:8000/guide', {
    method: 'POST',
    body: JSON.stringify({
      fio: fio,
      age: age,
      date: date
    }),
    headers: { 'Content-Type': 'application/json' }
  }).then(function () {
    window.location.reload();
  })
}

function stroka(guide, i) {
  const tr = $('<tr/>');

  tr.append($('<td/>', { html: i.toString()}));
  tr.append($('<td/>', { html: guide.fio}));
  tr.append($('<td/>', { html: guide.age}));
  tr.append($('<td/>', { html: guide.date}));

  const knopki = $('<td/>');

  knopki.append($('<button/>', {
    text: 'Изменить',
    class: 'btn btn-primary',
    click: function () {edit(i)}
  }));
  knopki.append($('<button/>', {
    text: 'Удалить',
    class: 'btn btn-danger',
    click: function () {remove(i)}
  }));

  tr.append(knopki);

  return tr;
}

$(document).ready(function(){
  fetch('http://localhost:8000/guide')
  .then((res) => res.json().then(function(res) {
    const table = $('#tablitsa')
    for (let i = 0; i < res.length; i++) {
      if (res[i] != null) {
        const tr = stroka(res[i], i);
        table.append(tr);
      }
    }
  }))
})
