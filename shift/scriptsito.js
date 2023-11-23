function createTable() {
  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  const daysInMonth = new Date(year, month, 0).getDate();

  let tableHTML = '<table><tr><th>Giorno</th><th>Ora di Inizio</th><th>Ora di Fine</th></tr>';

  for (let i = 1; i <= daysInMonth; i++) {
    tableHTML += `
      <tr>
        <td>${i}/0${month}/${year}</td>
        <td><input type="time" class="start-time" value="09:00" onchange="calculateTotalHours()"></td>
        <td><input type="time" class="end-time" value="17:00" onchange="calculateTotalHours()"></td>
      </tr>
    `;
  }

  tableHTML += '</table>';
  document.getElementById('tableContainer').innerHTML = tableHTML;
}

/*function calculateTotalHours() {
  const startTimeInputs = document.querySelectorAll('.start-time');
  const endTimeInputs = document.querySelectorAll('.end-time');

  let totalHours = 0;

  for (let i = 0; i < startTimeInputs.length; i++) {
    const start = moment(startTimeInputs[i].value, 'HH:mm');
    const end = moment(endTimeInputs[i].value, 'HH:mm');

    if (start.isValid() && end.isValid()) {
      const duration = moment.duration(end.diff(start)).asHours();
      totalHours += duration;
    }
  }

  document.getElementById('totalHours').textContent = `Totale ore lavorate nel mese: ${totalHours.toFixed(2)} ore`;
}*/
function calculateTotalHours() {
  const startTimeInputs = document.querySelectorAll('.start-time');
  const endTimeInputs = document.querySelectorAll('.end-time');

  let totalHours = 0;

  for (let i = 0; i < startTimeInputs.length; i++) {
    const start = moment(startTimeInputs[i].value, 'HH:mm');
    let end = moment(endTimeInputs[i].value, 'HH:mm');

    if (start.isValid() && end.isValid()) {
      // Se l'orario di fine turno è precedente all'orario di inizio, consideralo come del giorno successivo
      if (end.isBefore(start)) {
        end.add(1, 'day');
      }

      // Se l'orario di fine turno è successivo a mezzanotte, sottrai le ore dal giorno successivo
      if (end.hour() === 0 && end.minute() === 0) {
        end.subtract(1, 'day');
      }

      const duration = moment.duration(end.diff(start)).asHours();
      totalHours += duration;
    }
  }

  document.getElementById('totalHours').textContent = `Totale ore lavorate nel mese: ${totalHours.toFixed(2)} ore`;
}