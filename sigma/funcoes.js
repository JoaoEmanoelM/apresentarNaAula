let ctxCabecalho;
let ctxLinks;
let txtConteudo;
let ancora = true;

function configEstiloCabecalho() {
    const bg = document.getElementById("corFundo").value;
    const corFonte = document.getElementById("corFonte").value;
    const tamFonte = document.getElementById("tamFonte").value;

    ctxCabecalho = "#cabecalho {\n";
    ctxCabecalho += " background-color: " + bg + ";\n";
    ctxCabecalho += " color: " + corFonte + ";\n";
    ctxCabecalho += " font-size: " + tamFonte + "pt;\n";
    ctxCabecalho += "}\n";

    return ctxCabecalho;
}

function configEstiloLinks() {
    const corLink = document.getElementById("corLinks").value;
    const estiloLinks = document.querySelector('input[name="estiloLinks"]:checked')?.value || "0";
    const textDeco = estiloLinks === "1" ? "underline" : "none";

    ctxLinks = "a {\n color: " + corLink + ";\n text-decoration: " + textDeco + ";\n}\n";
    return ctxLinks;
}

function configEstiloHover() {
    const efeito = document.getElementById("efeitoHover").value;
    let style = "";

    switch (efeito) {
        case "underline":
            style = "a:hover {\n text-decoration: underline;\n}\n";
            break;
        case "colorChange":
            style = "a:hover {\n color: red;\n}\n";
            break;
        case "zoom":
            style = "a:hover {\n transform: scale(1.1);\n transition: 0.3s;\n}\n";
            break;
    }
    return style;
}

function configFonteGlobal() {
    const fonte = document.getElementById("fonteSite").value;
    return "body {\n font-family: " + fonte + ";\n}\n";
}

function configDimensoes() {
    const altCab = document.getElementById("alturaCabecalho").value;
    const largCab = document.getElementById("larguraCabecalho").value;
    const altLinks = document.getElementById("alturaLinks").value;
    const largLinks = document.getElementById("larguraLinks").value;

    let css = "";

    if (altCab || largCab) {
        css += "#cabecalho {\n";
        if (altCab) css += " height: " + altCab + "px;\n";
        if (largCab) css += " width: " + largCab + "%;\n";
        css += "}\n";
    }

    if (altLinks || largLinks) {
        css += "#links {\n";
        if (altLinks) css += " height: " + altLinks + "px;\n";
        if (largLinks) css += " width: " + largLinks + "%;\n";
        css += "}\n";
    }

    return css;
}

function configHTMLCabecalho() {
    const texto = document.querySelector("#textoCabecalho").value;
    return "<h1>" + texto + "</h1>";
}

function configHtmlLinks() {
    if (!ancora) return "";

    const links = document.getElementsByName("links");
    const hrefs = document.getElementsByName("href");

    let html = "";
    for (let i = 0; i < links.length; i++) {
        const file = hrefs[i].value.split("\\").pop();
        html += '<a href="' + file + '">' + links[i].value + '</a><br>\n';
    }

    return html;
}

function configHTMLConteudo() {
    txtConteudo = document.querySelector("#txtConteudo").value;
    return txtConteudo;
}

function gerarCodigo() {
    // CSS
    const codeCSS = document.querySelector("#codeCSS");
    let css = configFonteGlobal();
    css += configEstiloCabecalho();
    css += configEstiloLinks();
    css += configEstiloHover();
    css += configDimensoes();
    codeCSS.value = css;

    // HTML
    const codeHTML = document.querySelector("#codeHTML");
    let html = "<!DOCTYPE html>\n<html>\n<head>\n";
    html += "<meta charset='UTF-8'>\n";
    html += "<link rel='stylesheet' href='estilo.css'>\n";
    html += "<title>Minha Página</title>\n</head>\n<body>\n";
    html += "<div id='cabecalho'>" + configHTMLCabecalho() + "</div>\n";
    html += "<nav id='links'>\n" + configHtmlLinks() + "</nav>\n";
    html += "<div id='conteudo'>\n" + configHTMLConteudo() + "\n</div>\n";
    html += "</body>\n</html>";

    codeHTML.value = html;
}

function download(id, filename) {
    if (filename.trim() === '') {
        filename = document.getElementById("nomeHTML").value + ".html";
    }

    const text = document.getElementById(id).value;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function criarLinks() {
    const pai = document.getElementById("areaLinks");

    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.name = "links";
    inputText.placeholder = "Nome do link";

    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.name = "href";

    const btn = document.createElement("button");
    btn.innerText = "+";
    btn.onclick = criarLinks;

    pai.appendChild(document.createElement("br"));
    pai.appendChild(inputText);
    pai.appendChild(inputFile);
    pai.appendChild(btn);
}

function removeLinks(check) {
    const visibilidade = check.checked ? "hidden" : "visible";
    ancora = !check.checked;
    document.querySelector("#areaLinks").style.visibility = visibilidade;
}

function renderIframe() {
    const iframe = document.getElementById('pagina');
    const htmlCode = document.getElementById('codeHTML').value;
    const cssCode = document.getElementById('codeCSS').value;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');

    const style = document.createElement('style');
    style.textContent = cssCode;

    if (doc.head) {
        doc.head.appendChild(style);
    }

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write('<!DOCTYPE html>\n' + doc.documentElement.outerHTML);
    iframeDoc.close();
}

function mostraOcultaDiv(id) {
    const divs = document.querySelectorAll('.content');
    divs.forEach(div => div.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
    }
}

function aviso() {
    alert('Para que o link funcione o arquivo de destino deve estar no diretório do projeto');
    return true;
}
