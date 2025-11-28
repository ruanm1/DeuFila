const estabelecimentos = [
    { id: 1, nome: "Bar do Alemão", foto: "alemao.jpg", avaliacao: 4.8, avaliacoes: 234, categoria: "Bar",
      promocao: "2 cervejas pelo preço de 1", desconto: "15% de desconto",
      descricao: "Tradicional bar alemão com a melhor cerveja artesanal da cidade.",
      horario: "17:00 - 02:00", preco: "$$", endereco: "Rua Central, 400 - Centro", telefone: "(83) 99999-1111" , statusFila: "lotado"
},

    { id: 2, nome: "Maria's Pub", foto: "maria.jpg", avaliacao: 4.7, avaliacoes: 98, categoria: "Pub",
      promocao: "Chopp 600ml R$7", desconto: "Todas as noites",
      descricao: "Pub com música ao vivo.",
      horario: "18:00 - 03:00", preco: "$$", endereco: "Rua Maciel Pinheiro, 1234 - Centro", telefone: "(83) 98765-4321" ,statusFila: "medio"
},

    { id: 3, nome: "Seu João Boteco", foto: "joao.jpg", avaliacao: 4.6, avaliacoes: 146, categoria: "Boteco",
      promocao: "Caipirinha R$5", desconto: "A noite toda",
      descricao: "Boteco tradicional com petiscos artesanais.",
      horario: "16:00 - 01:00", preco: "$", endereco: "Rua das Flores, 88", telefone: "(83) 99888-2233" ,statusFila: "vazio"
},

    { id: 4, nome: "Bistrô da Lú", foto: "lu.jpg", avaliacao: 4.9, avaliacoes: 200, categoria: "Bistrô",
      promocao: "Vinho da Casa 20% OFF", desconto: "Sexta e sábado",
      descricao: "Ambiente elegante com pratos exclusivos.",
      horario: "19:00 - 00:00", preco: "$$$", endereco: "Av. Gourmet, 200", telefone: "(83) 91234-5678" ,statusFila: "medio"
},

    { id: 5, nome: "Hamburgueria do Zé", foto: "ze.jpg", avaliacao: 4.8, avaliacoes: 180, categoria: "Hamburgueria",
      promocao: "Combo 2x1", desconto: "Somente hoje",
      descricao: "Hambúrguer artesanal com ingredientes premium.",
      horario: "18:00 - 23:30", preco: "$$", endereco: "Rua do Sol, 50", telefone: "(83) 95555-7788",statusFila: "medio"
 },

    { id: 6, nome: "Pizza da Praça", foto: "pizza.jpg", avaliacao: 4.5, avaliacoes: 310, categoria: "Pizzaria",
      promocao: "Pizza Grande R$25", desconto: "Somente delivery",
      descricao: "Pizzaria tradicional com massa fresca.",
      horario: "18:00 - 00:00", preco: "$$", endereco: "Praça Central, 40", telefone: "(83) 96666-8899",statusFila: "lotado" },

    { id: 7, nome: "Café Encanto", foto: "cafe.jpg", avaliacao: 4.9, avaliacoes: 410, categoria: "Café",
      promocao: "Cappuccino R$6", desconto: "Manhã toda",
      descricao: "O melhor café da cidade com ambiente aconchegante.",
      horario: "07:00 - 20:00", preco: "$", endereco: "Rua Esperança, 12", telefone: "(83) 97777-3344",statusFila: "vazio"
 },

    { id: 8, nome: "Restaurante Sabor Caseiro", foto: "caseiro.jpg", avaliacao: 4.3, avaliacoes: 290, categoria: "Restaurante",
      promocao: "Prato Feito R$12", desconto: "Seg a Sex",
      descricao: "Comida caseira deliciosa.",
      horario: "11:00 - 15:00", preco: "$", endereco: "Rua do Campo, 90", telefone: "(83) 93333-1122",statusFila: "vazio"
 }
];

function Lista({ abrir }) {
    return (
        <div className="lista">
            <h2>Bares e Restaurantes</h2>

            {estabelecimentos.map(est => (
                <div key={est.id} className="card" onClick={() => abrir(est.id)}>
                    <img src={est.foto} className="thumb" alt={est.nome} />
                    <div className="info">
                        <p className="nome">{est.nome}</p>
                        <p className="sub">
                            <svg className="icon"><use href="#icon-star" /></svg>
                            {est.avaliacao} • {est.categoria}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function Perfil({ id, voltar }) {
    id = Number(id);
    const bar = estabelecimentos.find(e => e.id === id);
    if (!bar) return <div>Erro ao carregar</div>;

    return (
        <div className="page-wrapper">

            <div className="header-image">
                <button className="back-btn" onClick={voltar}>←</button>
                <div 
  className={
    bar.statusFila === "lotado" 
      ? "tag-alert red" 
      : bar.statusFila === "medio"
        ? "tag-alert orange"
        : "tag-alert green"
  }
>
  {bar.statusFila === "lotado" && "Muita fila agora!"}
  {bar.statusFila === "medio" && "Movimento moderado"}
  {bar.statusFila === "vazio" && "Sem filas no momento"}
</div>

                <img src={bar.foto} className="bar-image" alt={bar.nome} />
            </div>

            <div className="container">

                <h2>{bar.nome}</h2>

                <div className="rating">
                    <svg className="icon"><use href="#icon-star" /></svg>
                    {bar.avaliacao} ({bar.avaliacoes} avaliações) • {bar.categoria}
                </div>

                <button className="promo-badge">🎁 Promoção</button>

                <div className="promo-card">
                    <strong>{bar.promocao}</strong><br />
                    <span>{bar.desconto}</span>
                </div>

                <p className="description">{bar.descricao}</p>

                <div className="info-grid">
                    <div className="info-card">
                        <div className="info-line">
                            <svg className="icon"><use href="#icon-clock" /></svg>
                            <p className="info-title">Horário</p>
                        </div>
                        <p className="info-value">{bar.horario}</p>
                    </div>

                    <div className="info-card">
                        <div className="info-line">
                            <svg className="icon"><use href="#icon-money" /></svg>
                            <p className="info-title">Preço</p>
                        </div>
                        <p className="info-value">{bar.preco}</p>
                    </div>
                </div>

                <div className="extra-card">
                    <div className="info-line">
                        <svg className="icon"><use href="#icon-location" /></svg>
                        <p className="extra-title">Endereço</p>
                    </div>
                    <p className="extra-text">{bar.endereco}</p>
                </div>

                <div className="extra-card">
                    <div className="info-line">
                        <svg className="icon"><use href="#icon-phone" /></svg>
                        <p className="extra-title">Telefone</p>
                    </div>
                    <p className="extra-text">{bar.telefone}</p>
                </div>

                <button 
    className="reserve-btn" 
    onClick={() => window.location.href = `reservas.html?id=${bar.id}`}
>
    Fazer Reserva
</button>
            </div>
        </div>
    );
}

function App() {
    const [tela, setTela] = React.useState("lista");
    const [idSelecionado, setIdSelecionado] = React.useState(null);

    function abrir(id) {
        setIdSelecionado(Number(id));
        setTela("perfil");
        window.scrollTo(0, 0);
    }

    function voltar() {
        setTela("lista");
    }

    return (
        <div>
            {tela === "lista" && <Lista abrir={abrir} />}
            {tela === "perfil" && <Perfil id={idSelecionado} voltar={voltar} />}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
