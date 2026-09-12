function mostrarTela(tela){
    const conteudo = document.querySelectorAll('.dados_sistema');

    conteudo.forEach(function(conteudo){
        conteudo.style.display = 'none';
        conteudo.classList.remove('animar');
    });

    document.getElementById(tela).classList.add('ativo');

    const telaatual = document.getElementById(tela);

    if(telaatual){
        telaatual.style.display = 'block';

        void telaatual.offsetWidth;
        telaatual.classList.add('animar');
    }

    if(tela === 'dashbord'){
        setTimeout(() => {
            window.graficoBarras.resize();
            window.graficoRosca.resize();
        }, 50);
    }

}
mostrarTela('dashbord');