const Footer = () => {
  return (
    <div className="footer">
  		<div className="container">
  			<div className="footer_grid">
  				<div className="footer_grid-left">
  					<div className="footer_box">
  						<div className="footer_box-title">О нас</div>
  						<a className="footer_box-link" href="">Работа в Старик Хинкалыч</a>
  						<a className="footer_box-link" href="">Франчайзинг</a>

  					</div>
  					<div className="footer_box">
  						<div className="footer_box-title">Контакты</div>
  						<a className="footer_box-link" href="">Обратная связь</a>
  						<a className="footer_box-link" href="">Информация о франшизе</a>
  						<div className="footer_box-soc">
  							<img src="/images/icon/vk.png" alt="" />
  							<img src="/images/icon/inst.png" alt="" />
  						</div>
  					</div>
  				</div>
  				
  			</div>
  			<div className="foot">
  				<div className="foot-item">
  					<span>«Старик Хинкалыч» © 2021</span>
  				</div>
  				<div className="foot-item">
  					<a href="">Пользовательское соглашение</a>
  				</div>
  				<div className="foot-item">
  					<a href="">Политика обработки персональных данных</a>
  				</div>
  			</div>
  		</div>
  	</div>
  )
}
export default Footer