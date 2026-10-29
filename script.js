// Substitua pelo WhatsApp do estabelecimento.
// Use: código do país + DDD + número, somente dígitos.
const numeroWhatsApp = "5535998195584";

// Busca os elementos do formulário no HTML.
const formulario = document.querySelector("#formulario-agendamento");
const campoNome = document.querySelector("#nome");
const campoServico = document.querySelector("#servico");
const campoData = document.querySelector("#data");
const campoHorario = document.querySelector("#horario");

// Retorna a data local no formato usado pelo campo de data.
function obterDataDeHoje() {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

// Impede escolher uma data anterior a hoje pelo seletor.
campoData.min = obterDataDeHoje();

// Executa esta função quando a pessoa envia o formulário.
formulario.addEventListener("submit", function (evento) {
  // Impede que o navegador recarregue a página.
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const servico = campoServico.value;
  const data = campoData.value;
  const horario = campoHorario.value;

  // Confere se o nome tem algo além de espaços.
  if (nome === "") {
    alert("Digite seu nome para continuar.");
    campoNome.focus();
    return;
  }

  // Atualiza o limite, caso a página tenha ficado aberta de um dia para outro.
  campoData.min = obterDataDeHoje();

  if (!formulario.reportValidity()) {
    return;
  }

  // Transforma AAAA-MM-DD em DD/MM/AAAA para a mensagem.
  const partesDaData = data.split("-");
  const dataFormatada =
    `${partesDaData[2]}/${partesDaData[1]}/${partesDaData[0]}`;

  // Monta o texto que aparecerá no WhatsApp.
  const mensagem = `Olá! Gostaria de solicitar um agendamento.

Nome: ${nome}
Serviço: ${servico}
Data: ${dataFormatada}
Horário: ${horario}

Esse horário está disponível?`;

  // Prepara o texto para ser usado em um endereço de internet.
  const mensagemCodificada = encodeURIComponent(mensagem);

  const linkWhatsApp =
  `https://wa.me/5535998195584?text=${mensagemCodificada}`;

  // Abre o WhatsApp com a mensagem preenchida.
  window.location.href = linkWhatsApp;
});