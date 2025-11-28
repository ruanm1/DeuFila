console.log("reservas.js carregado!");

const horariosEstabelecimentos = {
  1: { abre: "17:00", fecha: "02:00" },
  2: { abre: "18:00", fecha: "03:00" },
  3: { abre: "16:00", fecha: "01:00" },
  4: { abre: "19:00", fecha: "00:00" },
  5: { abre: "18:00", fecha: "23:30" },
  6: { abre: "18:00", fecha: "00:00" },
  7: { abre: "07:00", fecha: "20:00" },
  8: { abre: "11:00", fecha: "15:00" }
};

const params = new URLSearchParams(window.location.search);
const barId = params.get("id");

console.log("ID recebido:", barId);

function gerarHorarios(abre, fecha) {
  const horarios = [];

  let [hA, mA] = abre.split(":").map(Number);
  let [hF, mF] = fecha.split(":").map(Number);

  let abertura = hA * 60 + mA;
  let fechamento = hF * 60 + mF;

  if (fechamento < abertura) fechamento += 24 * 60;

  const limite = fechamento - 180; // 3 horas antes de fechar

  for (let t = abertura; t <= limite; t += 60) {
    const hora = String(Math.floor(t / 60) % 24).padStart(2, "0");
    const minuto = String(t % 60).padStart(2, "0");
    horarios.push(`${hora}:${minuto}`);
  }

  return horarios;
}

const selectHora = document.getElementById("hora");

if (barId && horariosEstabelecimentos[barId]) {
  const { abre, fecha } = horariosEstabelecimentos[barId];
  const horarios = gerarHorarios(abre, fecha);

  selectHora.innerHTML = `<option value="">Selecione um horário</option>`;
  horarios.forEach(h => {
    const o = document.createElement("option");
    o.value = o.textContent = h;
    selectHora.appendChild(o);
  });
}

const form = document.getElementById("form-reserva");
const lista = document.getElementById("lista-reservas");

form.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const pessoas = document.getElementById("pessoas").value;
  const obs = document.getElementById("observacao").value;

  if (!nome || !data || !hora || pessoas <= 0) {
    alert("Preencha todos os campos!");
    return;
  }

  const card = document.createElement("div");
  card.className = "reserva-card";
  card.innerHTML = `
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Data:</strong> ${data}</p>
    <p><strong>Hora:</strong> ${hora}</p>
    <p><strong>Pessoas:</strong> ${pessoas}</p>
    ${obs ? `<p><strong>Obs:</strong> ${obs}</p>` : ""}
    <button class="delete-btn" onclick="this.parentElement.remove()">Cancelar Reserva</button>
  `;

  lista.appendChild(card);

  form.reset();

  document.getElementById("confirmacao").style.display = "flex";
});

function fecharConfirmacao() {
  document.getElementById("confirmacao").style.display = "none";
}
