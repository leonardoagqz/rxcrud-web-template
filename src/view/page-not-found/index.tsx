import './page-not-found.js';
import './page-not-found.css';

function PageNotFound() {
    return (
        <div className='not_found'>
            <form action='/home'>
                <div className='moon'></div>
                <div className='moon_crater moon_crater1'></div>
                <div className='moon_crater moon_crater2'></div>
                <div className='moon_crater moon_crater3'></div>

                <div className='star star1'></div>
                <div className='star star2'></div>
                <div className='star star3'></div>
                <div className='star star4'></div>
                <div className='star star5'></div>

                <div className='error'>
                    <div className='error_title'>404</div>
                    <div className='error_subtitle'>Hmmm...</div>
                    <div className='error_description'>Parece que você tentou acessar um endereço <br /> que não foi encontrado.</div>
                    <button className='error_button error_button--active' type='submit'>Voltar para página principal</button>
                </div>

                <div className='astronaut'>
                    <div className='astronaut_backpack'></div>
                    <div className='astronaut_body'></div>
                    <div className='astronaut_body_chest'></div>
                    <div className='astronaut_arm-left1'></div>
                    <div className='astronaut_arm-left2'></div>
                    <div className='astronaut_arm-right1'></div>
                    <div className='astronaut_arm-right2'></div>
                    <div className='astronaut_arm-thumb-left'></div>
                    <div className='astronaut_arm-thumb-right'></div>
                    <div className='astronaut_leg-left'></div>
                    <div className='astronaut_leg-right'></div>
                    <div className='astronaut_foot-left'></div>
                    <div className='astronaut_foot-right'></div>
                    <div className='astronaut_wrist-left'></div>
                    <div className='astronaut_wrist-right'></div>

                    <div className='astronaut_cord'>
                        <canvas id='cord' height='500px' width='500px'></canvas>
                    </div>

                    <div className='astronaut_head'>
                        <canvas id='visor' width='60px' height='60px'></canvas>
                        <div className='astronaut_head-visor-flare1'></div>
                        <div className='astronaut_head-visor-flare2'></div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PageNotFound;