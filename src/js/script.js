// Parte funcional/dinâmica do projeto

// Array com todas as informações de cada música
// Necessário colocar as informações de novas músicas neste array e salvar as imagem
// e o .mp3 nas devidas pastas, para que sejam carregadas no site.
const baseMusicas = [
    {
        'name': 'Believer',
        'artist': 'Imagine Dragons',
        'path': './src/audio/Imagine_Dragons_-_Believer.mp3',
        'album': 'Evolve',
        'pathImg': './src/img/Album1.png',
    },
    {
        'name': 'I Found',
        'artist': 'Amber Run',
        'path': './src/audio/Amber_Run_-_I_Found.mp3',
        'album': '5AM (Expanded Edition)',
        'pathImg': './src/img/Album2.png',
    },
    {
        'name': 'Crossfire',
        'artist': 'Stephen',
        'path': './src/audio/Stephen_-_Crossfire.mp3',
        'album': 'Sincerely',
        'pathImg': './src/img/Album3.png',
    },
    {
        'name': 'Bloodshot',
        'artist': 'Sam Tinnesz',
        'path': './src/audio/Sam_Tinnesz_-_Bloodshot.mp3',
        'album': 'Warplanes',
        'pathImg': './src/img/Album4.png',
    }
]

/*
    <li>
        <p class="primeiroItem">Believer</p>
        <p>Imagine Dragons</p>
        <p>Evolve</p>
    </li>
*/

const listaMusicas = document.querySelector('.listaMusicas');
const tagAudio = document.getElementById('saidaAudio');
let musicaAtual = 0;

// Atualiza a quantidade de músicas no site
const totalMusicas = document.getElementById('qtdSons');
totalMusicas.innerText = String(baseMusicas.length) + ' songs';

// Seleciona a primeira música para ficar na "fila"
const primeiraMusica = baseMusicas[0];
tagAudio.src = primeiraMusica.path;
atualizaPlayer(baseMusicas[0].artist, baseMusicas[0].name, baseMusicas[0].pathImg);

// Atribuindo os Ids para as variáveis dos botões
const botaoPausar = document.getElementById('botaoPause');
const botaoPlay = document.getElementById('botaoPlay');
const botaoNext = document.getElementById('botaoNext');
const botaoPrev = document.getElementById('botaoPrev');

// Constrói a lista de músicas no html 
function construirPlaylist(musica, musicaId){
    
    const musicaElemento = document.createElement('li');
    const nomeMusica = document.createElement('p');
    const nomeArtista = document.createElement('p');
    const nomeAlbum = document.createElement('p');

    musicaElemento.dataset.id = musicaId;

    nomeMusica.className = 'primeiroItem';
    nomeMusica.innerText = musica.name;
    nomeArtista.innerText = musica.artist;
    nomeAlbum.innerText = musica.album;

    musicaElemento.appendChild(nomeMusica);
    musicaElemento.appendChild(nomeArtista);
    musicaElemento.appendChild(nomeAlbum);

    musicaElemento.addEventListener('click', tocarMusica);

    listaMusicas.appendChild(musicaElemento);
}

for(let i = 0; i < baseMusicas.length; i++){
    construirPlaylist(baseMusicas[i], i);
}

// Começa a tocar quando o usuário clica em alguma música
// ou aperta o botão de play
botaoPlay.addEventListener('click', tocarMusica);

function tocarMusica(evento){
    const elementoClicado = evento.currentTarget;
    
    if(elementoClicado.tagName === 'LI'){
        const musicaId = elementoClicado.dataset.id;
        const musicaSelecionada = baseMusicas[musicaId];
        
        tagAudio.src = musicaSelecionada.path;
        musicaAtual = Number(musicaId);
        tagAudio.play();
        botaoPlay.classList.add('playing');
        atualizaPlayer(baseMusicas[musicaId].artist, baseMusicas[musicaId].name, baseMusicas[musicaId].pathImg);

    }else{
        if(tagAudio.paused === true){
            tagAudio.play();
            botaoPlay.classList.add('playing');
        }else{
            tagAudio.pause();
            botaoPlay.classList.remove('playing');
        }
    }
}

// Botão pausar
botaoPausar.addEventListener('click', pausarMusica);

function pausarMusica(){
    tagAudio.pause();
    botaoPlay.classList.remove('playing');
}

// Botão next (próxima música)
botaoNext.addEventListener('click', tocarProximaMusica);

function tocarProximaMusica(){
    if(musicaAtual === baseMusicas.length - 1){
        musicaAtual = 0;
    }else{
        musicaAtual++;
    }

    tagAudio.src = baseMusicas[musicaAtual].path;
    botaoPlay.classList.add('playing');
    tagAudio.play();

    let nomeDoArtista = baseMusicas[musicaAtual].artist;
    let nomeDaMusica = baseMusicas[musicaAtual].name;
    let novaFoto = baseMusicas[musicaAtual].pathImg;
    atualizaPlayer(nomeDoArtista, nomeDaMusica, novaFoto);
}

// Botão prev (música anterior)
botaoPrev.addEventListener('click', tocarMusicaAnterior);

function tocarMusicaAnterior(){
    if(musicaAtual === 0){
        musicaAtual = baseMusicas.length - 1;
    }else{
        musicaAtual--;
    }

    tagAudio.src = baseMusicas[musicaAtual].path;
    botaoPlay.classList.add('playing');
    tagAudio.play();

    let nomeDoAutor = baseMusicas[musicaAtual].artist;
    let nomeDaMusic = baseMusicas[musicaAtual].name;
    let novaImg = baseMusicas[musicaAtual].pathImg;
    atualizaPlayer(nomeDoAutor, nomeDaMusic, novaImg);
}

// Controle do volume
const areaPlayerVolume = document.querySelector('.areaPlayerVolume input');
areaPlayerVolume.addEventListener('input', controleVolume);

function controleVolume(){
    tagAudio.volume = areaPlayerVolume.value;
}

// Função para atualizar o nome da música, nome do artista  
// e imagem da música atual

function atualizaPlayer(nome, musica, foto){
    const nomeArt = document.getElementById('nomeArtista');
    const nomeMsc = document.getElementById('nomeMusica');
    const fotoAlbum = document.getElementById('fotoAlbum');
    
    fotoAlbum.src = foto;   
    nomeMsc.innerText = musica;
    nomeArt.innerText = nome;
}