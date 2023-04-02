sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library, JSONModel) {
        "use strict";
        var urlObject = library.URLHelper;


        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () {
               //alert("Aprendendo SAP");
               let produto = {};
               let productModel = new JSONModel(produto);
               let view = this.getView();
               view.setModel(productModel,"ModeloProduto");
            },

            onPressBuscar: function(){
                //Variaveis 
                //Tipo texto com aspas 
                //Tipo numerico sem aspas

                let input;
                input = this.byId("inpBusca");
                let valor = input.getValue();
                //alert(valor);
                
                let parameters = {
                    url : "http://world.openfoodfacts.org/api/v2/product/" + valor,
                    method : "GET",
                    async : true,
                    crossDomain : true 

                };

                $.ajax(parameters).done(function(response){
                   let oProdutoModel = this.getView().getModel("ModeloProduto");
                   oProdutoModel.setData({});
                   oProdutoModel.refresh();
                   oProdutoModel.setData(response);
                   oProdutoModel.refresh();
                   
                }.bind(this))
                .fail(function(){
                    debugger 

                }.bind(this));



                /*let material = "Agua Mineral Natural";
                let peso = 500;
                let uom = "ml";
                let qtdsodio = 15.66;
                let conteudoliquido = true;

                //tabela interna no javascript - array
                let composicao = ["bicarbonato","magnesio","sufato","brometo"];
                //estrutura - tipo com varias propriedades - ou tambem chamado de objeto
                let produto = {
                    descricao: "cha verde",
                    marca: "quaker",
                    peso: 130,
                    uom: "g"
                }*/





            },

            onClickImage: function(oEvent){
                 urlObject.redirect(oEvent.getSource().getSrc(),true);


            }
        });
    });
