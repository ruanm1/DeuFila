const estabelecimentos = [
    {
        id: 1,
        nome: "Bar do Alemão",
        foto: "alemao.jpg",
        avaliacao: 4.8,
        avaliacoes: 234,
        categoria: "Bar",
        promocao: "2 cervejas pelo preço de 1",
        desconto: "15% de desconto",
        descricao: "Tradicional bar alemão com a melhor cerveja artesanal da cidade.",
        horario: "17:00 - 02:00",
        preco: "$$",
        endereco: "Rua Central, 400 - Centro",
        telefone: "(83) 99999-1111",
        statusFila: "lotado"
    },
    {
        id: 2,
        nome: "Maria's Pub",
        foto: "maria.jpg",
        avaliacao: 4.7,
        avaliacoes: 98,
        categoria: "Pub",
        promocao: "Chopp 600ml R$7",
        desconto: "Todas as noites",
        descricao: "Pub com música ao vivo.",
        horario: "18:00 - 03:00",
        preco: "$$",
        endereco: "Rua Maciel Pinheiro, 1234 - Centro",
        telefone: "(83) 98765-4321",
        statusFila: "medio"
    },
    {
        id: 3,
        nome: "Seu João Boteco",
        foto: "joao.jpg",
        avaliacao: 4.6,
        avaliacoes: 146,
        categoria: "Boteco",
        promocao: "Caipirinha R$5",
        desconto: "A noite toda",
        descricao: "Boteco tradicional com petiscos artesanais.",
        horario: "16:00 - 01:00",
        preco: "$",
        endereco: "Rua das Flores, 88",
        telefone: "(83) 99888-2233",
        statusFila: "vazio"
    },
    {
        id: 4,
        nome: "Bistrô da Lú",
        foto: "lu.jpg",
        avaliacao: 4.9,
        avaliacoes: 200,
        categoria: "Bistrô",
        promocao: "Vinho da Casa 20% OFF",
        desconto: "Sexta e sábado",
        descricao: "Ambiente elegante com pratos exclusivos.",
        horario: "19:00 - 00:00",
        preco: "$$$",
        endereco: "Av. Gourmet, 200",
        telefone: "(83) 91234-5678",
        statusFila: "medio"
    },
    {
        id: 5,
        nome: "Hamburgueria do Zé",
        foto: "ze.jpg",
        avaliacao: 4.8,
        avaliacoes: 180,
        categoria: "Hamburgueria",
        promocao: "Combo 2x1",
        desconto: "Somente hoje",
        descricao: "Hambúrguer artesanal com ingredientes premium.",
        horario: "18:00 - 23:30",
        preco: "$$",
        endereco: "Rua do Sol, 50",
        telefone: "(83) 95555-7788",
        statusFila: "medio"
    },
    {
        id: 6,
        nome: "Pizza da Praça",
        foto: "pizza.jpg",
        avaliacao: 4.5,
        avaliacoes: 310,
        categoria: "Pizzaria",
        promocao: "Pizza Grande R$25",
        desconto: "Somente delivery",
        descricao: "Pizzaria tradicional com massa fresca.",
        horario: "18:00 - 00:00",
        preco: "$$",
        endereco: "Praça Central, 40",
        telefone: "(83) 96666-8899",
        statusFila: "lotado"
    },
    {
        id: 7,
        nome: "Café Encanto",
        foto: "cafe.jpg",
        avaliacao: 4.9,
        avaliacoes: 410,
        categoria: "Café",
        promocao: "Cappuccino R$6",
        desconto: "Manhã toda",
        descricao: "O melhor café da cidade com ambiente aconchegante.",
        horario: "07:00 - 20:00",
        preco: "$",
        endereco: "Rua Esperança, 12",
        telefone: "(83) 97777-3344",
        statusFila: "vazio"
    },
    {
        id: 8,
        nome: "Restaurante Sabor Caseiro",
        foto: "caseiro.jpg",
        avaliacao: 4.3,
        avaliacoes: 290,
        categoria: "Restaurante",
        promocao: "Prato Feito R$12",
        desconto: "Seg a Sex",
        descricao: "Comida caseira deliciosa.",
        horario: "11:00 - 15:00",
        preco: "$",
        endereco: "Rua do Campo, 90",
        telefone: "(83) 93333-1122",
        statusFila: "vazio"
    }
];

function Lista({ abrir }) {
    return (
        <div className="catalogo-page page-wrapper">

            <div className="catalogo-header">
                <h2 className="title">Descubra</h2>
                <p className="subtitle">Os melhores lugares perto de você</p>
            </div>

            <div className="premium-banner">
                <h3>Torne-se Premium</h3>
                <p>Descontos maiores e menos visitas para recompensas!</p>
            </div>

            <div className="search-container">
                <input type="text" placeholder="Buscar bares e restaurantes..." />
            </div>

            <div className="filters">
                <button className="filter-btn active">Todos</button>
                <button className="filter-btn vazio">Vazio</button>
                <button className="filter-btn moderado">Moderado</button>
                <button className="filter-btn lotado">Lotado</button>
            </div>

            <h3 className="section-title">Populares agora</h3>

            <div className="catalogo">
                {estabelecimentos.map(est => (
                    <div key={est.id} className="catalogo-card" onClick={() => abrir(est.id)}>
                        <div className="img-box">
                            <img src={est.foto} alt={est.nome} />
                            <span className={`status-badge ${est.statusFila}`}>
                                {est.statusFila === "lotado" && "Lotado"}
                                {est.statusFila === "medio" && "Moderado"}
                                {est.statusFila === "vazio" && "Vazio"}
                            </span>
                        </div>

                        <div className="card-info">
                            <p className="promo">🎉 {est.promocao}</p>
                            <p className="nome">{est.nome}</p>
                            <p className="sub">⭐ {est.avaliacao} • {est.categoria}</p>

                            <div className="card-footer">
                                <span className="distancia">📍 0.5 km</span>
                                <span className="mov">👁️ Ver movimento</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

function Perfil({ id, voltar }) {

    id = Number(id);
    const bar = estabelecimentos.find(e => e.id === id);

    const [showModal, setShowModal] = React.useState(false);
    const [estrela, setEstrela] = React.useState(0);
    const [texto, setTexto] = React.useState("");

    const [comentarios, setComentarios] = React.useState([
        { nome: "Ana Beatriz", estrelas: 5, texto: "Lugar maravilhoso! Atendimento perfeito e comida incrível.", data: "2025-11-26" },
        { nome: "Carlos Eduardo", estrelas: 3, texto: "Ambiente bom, mas esperei muito para ser atendido.", data: "2025-11-20" },
        { nome: "Mariana Silva", estrelas: 4, texto: "Gostei bastante! Voltarei outras vezes.", data: "2025-11-18" },
        { nome: "Pedro Henrique", estrelas: 2, texto: "Achei o preço meio salgado e a mesa estava suja.", data: "2025-11-15" },
        { nome: "Juliana Rocha", estrelas: 5, texto: "Melhor bar da cidade! Música boa e ótimo atendimento!", data: "2025-11-10" },
        { nome: "Ricardo Alves", estrelas: 1, texto: "Não gostei. Demorou demais e o prato veio frio.", data: "2025-11-05" }
    ]);

    if (!bar) return <div>Erro ao carregar</div>;

    function enviarComentario() {
        if (estrela === 0 || texto.trim() === "") return;

        const novo = {
            nome: "Cliente",
            estrelas: estrela,
            texto,
            data: new Date().toISOString().slice(0, 10)
        };

        setComentarios([novo, ...comentarios]);
        setEstrela(0);
        setTexto("");
        setShowModal(false);
    }

    return (
        <div className="page-wrapper">

            <div className="header-image">

                <button className="back-btn" onClick={voltar}>←</button>

                <div className={
                    bar.statusFila === "lotado" ? "tag-alert red" :
                    bar.statusFila === "medio" ? "tag-alert orange" :
                    "tag-alert green"
                }>
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

                <button
                    className="reserve-btn"
                    onClick={() => setShowModal(true)}
                >
                    Adicionar Comentário
                </button>

                <h3 style={{ marginTop: "25px" }}>Avaliações</h3>

                {comentarios.map((c, i) => (
                    <div key={i} className="comentario-card">

                        <div className="comentario-header">
                            <span className="comentario-nome">{c.nome}</span>
                            <span className="comentario-data">{c.data}</span>
                        </div>

                        <div className="comentario-stars">
                            {"★".repeat(c.estrelas)}
                            {"☆".repeat(5 - c.estrelas)}
                        </div>

                        <p className="comentario-texto">{c.texto}</p>

                    </div>
                ))}

            </div>

            {showModal && (
                <div className="modal-bg">
                    <div className="modal-box">

                        <h3>Avaliação</h3>

                        <div className="stars-area">
                            {[1, 2, 3, 4, 5].map(n => (
                                <span
                                    key={n}
                                    className={n <= estrela ? "star selected" : "star"}
                                    onClick={() => setEstrela(n)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        <textarea
                            placeholder="Escreva seu comentário..."
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                        />

                        <button className="btn-send" onClick={enviarComentario}>
                            Enviar
                        </button>
                        <button className="btn-cancel" onClick={() => setShowModal(false)}>
                            Cancelar
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
}

function Mapa() {
    return (
        <div className="mapa-wrapper page-wrapper">
            <h2 className="mapa-title">Mapa</h2>

            <iframe
                className="mapa-iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126655.43994972529!2d-35.98396628808288!3d-7.242830239086543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac1e5f43201c85%3A0xc9656aec3aa6af51!2sCampina%20Grande%2C%20PB!5e0!3m2!1spt-BR!2sbr!4v1764196727507!5m2!1spt-BR!2sbr"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

        </div>
    );
}

function PerfilUser() {

    const nome = "Lorem Ipsilum da Silva";
    const email = "lorem.y.silva@gmail.com";

    return (
        <div className="perfilUser-page page-wrapper">

            <div className="perfilUser-header">
                <div className="perfilUser-icon">👤</div>
                <h2 className="perfilUser-nome">{nome}</h2>
                <p className="perfilUser-email">{email}</p>
            </div>

            <div className="perfilUser-premium">
                <h3>Experiência sem anúncios</h3>
                <p>Aproveite benefícios exclusivos:</p>

                <ul>
                    <li>Sem anúncios</li>
                    <li>Até 40% de desconto</li>
                    <li>Recompensas mais rápidas</li>
                </ul>

                <button className="perfilUser-btn-premium">
                    Assinar por R$ 19,90/mês
                </button>
            </div>

            <div className="perfilUser-stats">
                <div><h3>12</h3><span>Visitados</span></div>
                <div><h3>8</h3><span>Favoritos</span></div>
                <div><h3>5</h3><span>Cupons</span></div>
            </div>

            <h3 className="perfilUser-subtitulo">Locais favoritos</h3>

            <div className="perfilUser-fav">❤️ Bar do Zé</div>
            <div className="perfilUser-fav">❤️ Cervejaria Artesanal</div>
            <div className="perfilUser-fav">❤️ Pub Irlandês</div>

            <div className="perfilUser-config">⚙️ Configurações</div>

            <div
                className="perfilUser-sair"
                onClick={() => window.location.href = "index.html"}
            >
                🚪 Sair
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
        <div className="app-wrapper">

            {tela === "lista" && <Lista abrir={abrir} />}
            {tela === "perfil" && <Perfil id={idSelecionado} voltar={voltar} />}
            {tela === "mapa" && <Mapa />}
            {tela === "perfilUser" && <PerfilUser />}

            <BottomBar tela={tela} mudarTela={setTela} />

        </div>
    );
}

function BottomBar({ tela, mudarTela }) {
    return (
        <div className="bottom-bar">

            <div
                className={`bottom-item ${tela === "lista" ? "active" : ""}`}
                onClick={() => mudarTela("lista")}
            >
                <span className="icon">🏠</span>
                <span className="label">Início</span>
            </div>

            <div
                className={`bottom-item ${tela === "mapa" ? "active" : ""}`}
                onClick={() => mudarTela("mapa")}
            >
                <span className="icon">🗺️</span>
                <span className="label">Mapa</span>
            </div>

            <div
                className={`bottom-item ${tela === "perfilUser" ? "active" : ""}`}
                onClick={() => mudarTela("perfilUser")}
            >
                <span className="icon">👤</span>
                <span className="label">Perfil</span>
            </div>

        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
