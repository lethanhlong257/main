const login = require('../api/api').login
export default class Menu extends React.Component{
    // onSubmit(e){
    //     e.preventDefault()
    //     const loginData = {
    //         username: this.refs.username.value,
    //         password: this.refs.password.value
    //     }
    //     login(loginData)
    //         .then(()=> console.log("dang nhap Thanh cong"))
        
    // }
    render(){
        return(
            <div class="head">
                <div class="container-fluid">
                    <div class="row">
    
                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 logo">
                            <i class="fa fa-futbol-o" aria-hidden="true"></i>
                        Sport Ranking
                        </div>
    
                        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 menu">
                            <header class="text-center">
                                <ul>
                                    <li>Email: lethanhlong257@gmail.com</li>
                                    <li>Phone: 01235123388</li>
                                    <li>
                                        <i class="fa fa-facebook-official"></i>
                                        <i class="fa fa-youtube-play"></i>
                                        <i class="fa fa-google-plus-official"></i>
                                    </li>
                                </ul>
                            </header>
                            <nav class="navbar navbar-default" role="navigation">
                                <div class="navbar-header">
                                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                                        <span class="sr-only">Toggle navigation</span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                </div>
    
                            
                                <div class="collapse navbar-collapse navbar-ex1-collapse">
    
                                    <ul class="nav navbar-nav">
                                        <li>
                                            <a href="#" class="active">Trang chủ</a>
                                        </li>
                                        <li>
                                            <a href="#">Tin tức thể thao</a>
                                        </li>
                                        <li>
                                            <a href="#">Diễn đàn</a>
                                        </li>
                                        <li>
                                            <a href="#">Đặt sân</a>
                                        </li>
                                        <li>
                                            <a href="#">Live</a>
                                        </li>
                                        <li>
                                            <a href="#">Event</a>
                                        </li>
                                        <li>                               
                                            <a href="javascript:void(0)" data-toggle="modal" data-target="#login-modal">Đăng nhập/Đăng kí</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>


                {/* <div id="login-modal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Đăng nhập / Đăng kí</h4>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.onSubmit.bind(this)} class="form-horizontal" id='login'>
                                    <div class="form-group">
                                        <label class="control-label col-sm-2"  for="username">Username:</label>
                                        <span id="username_err" style="color: red;"></span>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="username" ref="username" name="username" placeholder="Enter Username"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-2" for="pwd">Password:</label>
                                        <span id="password_err" style="color: red;"></span>
                                        <div class="col-sm-10"> 
                                            <input type="password" class="form-control" id="password" ref ="password"  name="password" placeholder="Enter password" />
                                        </div>
                                    </div>
                                    <div class="form-group"> 
                                        <div class="col-sm-offset-2 col-sm-10">
                                            <div class="checkbox">
                                                <label><input type="checkbox" /> Remember me</label><br/>
                                                <label><a href="#">Quên mật khẩu</a></label><br/>
                                                <label><a href="#">Chưa có tài khoản?</a></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group"> 
                                        <div class="col-sm-offset-2 col-sm-10">
                                            <input type="submit" class="btn btn-success" value="Login" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div> */}


            </div>
        )
    }
}
