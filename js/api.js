const select = document.getElementById("donor-state");

if (select) {
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(data => {
      select.innerHTML = "";

      // cria a opção padrão
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Selecione um estado";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      select.appendChild(defaultOption);

      // adiciona os estados
      data
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .forEach(estado => {
          const option = document.createElement("option");
          option.value = estado.sigla;
          option.textContent = estado.nome;
          select.appendChild(option);
        });
    })
    .catch(err => console.error(err));
}