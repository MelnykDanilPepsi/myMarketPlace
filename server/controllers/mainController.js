
class MainController {

    GetMainPage(req,res){
        res.render('home', {title: 'Home Page', balance: 0, registration: true, activeHome : "active",nav:true});
    }
    GetNewsPage(req,res){
        res.render('news', {title: 'News Page', balance: 0, registration: true, activeNews : "active",nav:true});
    }
    async AddPost(req,res){

    }
    GetPofilePage(req, res){

    }

}

export default new MainController;