fetch('/results')
  .then(response => response.json())
  .then(result => {
    const list = document.querySelector('#puzzles')
    result.forEach(entry => {
      const details = document.createElement('details')
      const summary = document.createElement('summary')
      summary.innerText = entry.name
      details.innerHTML = entry.result
      details.appendChild(summary)
      list.appendChild(details)
    })
  })
