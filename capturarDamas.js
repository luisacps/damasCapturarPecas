const tamanho = 40;
let pecaId = 0;
let posicaoInicial = 80;
let posicaoFinal = 81;
let classe = '';
let posicaoCaptura = '';
letjogada = 0;
document.body.append(criarTabuleiro());

function criarTabuleiro() {
    const tam = 8
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid'
    tabela.style.borderSpacing = 0
    tabela.style.margin = 'auto'

    for (let i=0; i < tam; i++) {
        let linha = document.createElement('tr');
        tabela.append(linha);
        for (let j=0; j < tam; j++) {
            let celula = document.createElement('td');
            celula.setAttribute('id',`${j}` + '-' + `${i}`);
            linha.append(celula);

            celula.style.width = `${tamanho}px`;
            celula.style.height = `${tamanho}px`;
            
                pecaId += 1

            if (i % 2 == j % 2) {
                celula.style.backgroundColor = 'black';
                celula.setAttribute("class","droptarget");
                if (i * 8 + j <= 24) {
                    celula.append(criarPeca('black', pecaId));
                } else if (i * 8 + j >= 40) {
                    celula.append(criarPeca('blue', pecaId));
                }
            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    };
    return tabela;
}

function criarPeca(cor, ide) {
        let imagem = document.createElement('img');

        imagem.setAttribute('src', `img/${cor}.png`);
        imagem.setAttribute('width', `${tamanho-4}px`);
        imagem.setAttribute('height', `${tamanho-4}px`);
        imagem.setAttribute('draggable','true');
	    imagem.setAttribute('id', ide);
	    imagem.setAttribute('class', cor);

    return imagem;
}

function dragstart(){
	document.addEventListener("dragstart", function(event) {
	  event.dataTransfer.setData("Text", event.target.id);
	  posicaoInicial = event.path[1].id.toString();
	  classe = (event.path[0].className);
	});
}

function dragend() {
	document.addEventListener("dragend", function(event) {
	});
}

function dragover() {
	document.addEventListener("dragover", function(event) {
	  event.preventDefault();
	});
}

function drop(){
	document.addEventListener("drop", function(event) {
	event.preventDefault();
	if ( event.target.className == "droptarget") {
		const data = event.dataTransfer.getData("Text");
		let c = event.path[0];
		let t = c.childElementCount;
		posicaoFinal = event.target.id.toString();
        let xI = posicaoInicial.substring(0,1);
        let yI = posicaoInicial.substring(2,3);
        let xF = posicaoFinal.substring(0,1);
        let yF = posicaoFinal.substring(2,3);

        if (classe == 'black' && xF < xI) {
            posicaoCaptura = (parseInt(xI) - 1).toString() + "-" + (parseInt(yI) + 1).toString();
        }
        else if (classe == 'black' && xF > xI) {
            posicaoCaptura = (parseInt(xI) + 1).toString() + "-" + (parseInt(yI) + 1).toString();
        }
        else if (classe == 'blue' && xF > xI) {
            posicaoCaptura = (parseInt(xI) + 1).toString() + "-" + (parseInt(yI) - 1).toString();
        }
        else if (classe == 'blue' && xF < xI) {
            posicaoCaptura = (parseInt(xI) - 1).toString() + "-" + (parseInt(yI) - 1).toString();
        }

        captura = document.getElementById(posicaoCaptura);
        if (captura.childElementCount == '1') {
			classeCapturada = captura.firstElementChild.className;
			pecaCapturada = captura.firstElementChild;
		}

        if (t == '0' && yI != yF) {
            if (classe == 'blue' && yI > yF && yI - yF == 1 && jogada % 2 == 0 || yI - yF == 2 && classeCapturada == "black" && jogada % 2 == 0 ||
            classe == 'black' && yI < yF && yI - yF == -1 && jogada % 2 == 1 || yI - yF == -2 && classeCapturada == "blue" && jogada % 2 == 1) {
                event.target.appendChild(document.getElementById(data));
                jogada += 1;
                if (yI - yF == 2 || yI - yF == -2) {
                    pecaCapturada.remove();
                    pecaCapturada = '';
                    classeCapturada = '';
                }
            }
        }
	}
	});
}

dragstart();
dragend();
dragover();
drop();
