import React, { Component } from 'react';

class FooterSection extends Component {
    state = {  }
    render() { 
        return ( 
            <footer className="footer">
                <div className="container">
			<div className="row">
				<div className="col-12 col-md-3">
					<h6 className="footer__title">TIỂU LUẬN CHUYÊN NGÀNH</h6>
					<ul className="footer__app"><li><a href="#"><img src="images/img-Download_on_the_App_Store_Badge.svg" alt=""/></a></li>
						<li><a href="#"><img src="images/img-google-play-badge.png" alt=""/></a></li>
					</ul></div>
				<div className="col-6 col-sm-4 col-md-3">
					<h6 className="footer__title">Legal</h6>
					<ul className="footer__list"><li><a>Điều khoản ...</a> </li>
					</ul></div>
				<div className="col-12 col-sm-4 col-md-3">
					<h6 className="footer__title">Contact</h6>
					<ul className="footer__list"><li><a href="tel:+18002345678">+08 9966420 </a></li>
						<li><a href="mailto:support@moviego.com">TVLOI3999@flixgo.com</a></li>
					</ul><ul className="footer__social"><li className="facebook"><a><i className="icon ion-logo-facebook"></i></a></li>
						<li className="instagram"><a><i className="icon ion-logo-instagram"></i></a></li>
						<li className="twitter"><a><i className="icon ion-logo-twitter"></i></a></li>
						<li className="vk"><a><i className="icon ion-logo-vk"></i></a></li>
					</ul></div>
                    
				<div className="col-12">
					<div className="footer__copyright">
						<small>&copy; 2020 LemonCat.</small>
					</div>
				</div>
				
			</div>
		</div>
	</footer>
         );
    }
}
 
export default FooterSection;