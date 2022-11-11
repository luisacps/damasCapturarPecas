const tCelula = 40;
let pecaId = 0;
let posicaoInicial = 80;
let posicaoFinal = 81;
let classe ='';
let localCaptura = '';
let jogada = 0;
document.body.append(criarTabuleiro());

function criarTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';

    for (let i = 0; i < tamanho; i++) {
        let linha = document.createElement('tr');
        tabela.append(linha);
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement('td');
			celula.setAttribute('id',`${j}` + '-' + `${i}`);
            linha.append(celula);
            celula.style.width = `${tCelula}px`;
            celula.style.height = `${tCelula}px`;
			pecaId += 1;
	
            if (i % 2 == j % 2) {
                celula.style.backgroundColor = 'black';
				celula.setAttribute("class","droptarget");
                if (i * 8 + j <= 24) {
                    celula.append(criarPeca('black',pecaId));
                } else if (i * 8 + j >= 40) {
                    celula.append(criarPeca('blue',pecaId));
                }
            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    };
	
    return tabela;	
}

function criarPeca(cor,ide) {
		let imagem = document.createElement('img');
		imagem.setAttribute('src', `img/${cor}.png`);
		imagem.setAttribute('width', `${tCelula-4}px`);
		imagem.setAttribute('height', `${tCelula-4}px`);
		imagem.setAttribute('draggable','true');
		imagem.setAttribute('id', ide);
		imagem.setAttribute('class', cor);
		
    return imagem;
}

function dragstart(){
	document.addEventListener("dragstart", function(event) {
	  event.dataTransfer.setData("Text", event.target.id);
	  posicaoInicial = event.path[1].id.toString();
	  classe = event.path[0].className;
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
		let xa = posicaoInicial.substring(0,1);
		let ya = posicaoInicial.substring(2,3);
		let xf = posicaoFinal.substring(0,1);
		let yf = posicaoFinal.substring(2,3);
		
		if(classe == 'black' && xf < xa) {
			localCaptura = (parseInt(xa) - 1).toString() + "-" + (parseInt(ya) + 1).toString();
		} else if(classe == 'black' && xf > xa) {
			localCaptura = (parseInt(xa) + 1).toString() + "-" + (parseInt(ya) + 1).toString();
		} else if(classe == 'blue' && xf > xa){
			localCaptura = (parseInt(xa) + 1).toString() + "-" + (parseInt(ya) - 1).toString();
		} else if(classe == 'blue' && xf < xa){
			localCaptura = (parseInt(xa) - 1).toString() + "-" + (parseInt(ya) - 1).toString();
		}
		captura = document.getElementById(localCaptura);
		if(captura.childElementCount == '1'){
			classeCapturada = captura.firstElementChild.className;
			pecaCapturada = captura.firstElementChild;
		}
		if (t == '0' && ya != yf){
			if (classe == 'blue' && ya > yf && ya - yf == 1 && jogada % 2 == 0 || ya - yf == 2 && classeCapturada == "black" && jogada % 2 == 0 || classe == 'black' && ya < yf && ya - yf == -1 && jogada % 2 == 1 || ya - yf == -2 && classeCapturada == "blue" && jogada % 2 == 1) {
				event.target.appendChild(document.getElementById(data));
				if (classe == 'blue' && yf == '0' || classe == 'black' && yf == '7'){
					rainha(classe,yf,xf);
				}
				jogada += 1;
				if(ya - yf == 2 || ya - yf == -2) {
					pecaCapturada.remove();
					pecaCapturada = '';
					classeCapturada = '';
				}
			}
		}
		
	}
	});
}
function rainha(classe, yf, xf){
	local = xf + '-' + yf;
	sub = document.getElementById(local);
	pe = sub.firstElementChild;
	addId = pe.id;
	addClass = pe.className;
	let imagem = document.createElement('img');
	if (classe == "blue") {
		imagem.setAttribute('src', 'img/blueKing.png');
	} else {
		imagem.setAttribute('src', 'img/blackKing.png');
	}
	imagem.setAttribute('width', `${tCelula-4}px`);
	imagem.setAttribute('height', `${tCelula-4}px`);
	imagem.setAttribute('draggable','true');
	imagem.setAttribute('id', addId);
	imagem.setAttribute('class', `${addClass}King`);
	pe.remove();
	sub.append(imagem);
}
dragstart();
dragend();
dragover();
drop();
