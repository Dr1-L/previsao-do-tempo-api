// incluir a key
const apiKey = "";

const cidadeInput = document.getElementById("cidade-input");
const pesquisar = document.getElementById("pesquisar");

const cidadePrevisao = document.getElementById("cidade");
const temperaturaPrevisao = document.querySelector("#temperatura span");
const descricaoPrevisao = document.getElementById("descricao");
const iconeTempoPrevisao = document.getElementById("icone-tempo");
const umidadePrevisao = document.querySelector("#det-umidade");
const ventoPrevisao = document.querySelector("#det-vento");
const sensacaoTermPrevisao = document.getElementById("det-sensacao");
const infosPrevisao = document.getElementById("infos-previsao");

// funções
const getDadosPrevisaoTempo = async (cidade) => {
    // define os valores da URL
    const units = "&units=metric";
    const key = "&appid=" + apiKey;
    const lang = "&lang=pt_br";

    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}${units}${key}${lang}`;

    const resp = await fetch(apiWeatherUrl);
    const data = await resp.json();

    return data;
};

const exibeDadosPrevisao = async (cidade) => {
    const data = await getDadosPrevisaoTempo(cidade);
    const status = data.cod;
    const avisoErro = document.getElementById("aviso-erro-previsao");

    if (status === 200) {
        // popula a view com as informações
        cidadePrevisao.innerText = data.name;
        descricaoPrevisao.innerText = data.weather[0].description;
        temperaturaPrevisao.innerText = parseInt(data.main.temp) + "°C";
        umidadePrevisao.innerText = data.main.humidity + " %";
        ventoPrevisao.innerText = data.wind.speed + " km/h";
        sensacaoTermPrevisao.innerText = data.main.feels_like + "°C";
        // altera o icone da previsão
        iconeTempoPrevisao.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

        avisoErro.classList.add("hide");
        infosPrevisao.classList.remove("hide");

    } else if (status !== 200) {
        // exibe a mensagem de erro
        avisoErro.classList.remove("hide");
        infosPrevisao.classList.add("hide");
    }
};

pesquisar.addEventListener('click', (e) => {
    e.preventDefault();
    exibeDadosPrevisao(cidadeInput.value);
});

cidadeInput.addEventListener('keyup', (e) => {
    if (e.code === "Enter") {
        exibeDadosPrevisao(cidadeInput.value);
    } else {
        cidadePrevisao.innerText = "";
        descricaoPrevisao.innerText = "";
        temperaturaPrevisao.innerText = "" + "°C";
        umidadePrevisao.innerText = "" + " %";
        ventoPrevisao.innerText = "" + " km/h";
        sensacaoTermPrevisao.innerText = "" + "°C";

    }
});
