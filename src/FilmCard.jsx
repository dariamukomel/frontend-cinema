import kinopoisk from "./assets/kinopoisk.svg"
import imdb from "./assets/imdb.svg"


export default  function FilmCard(props){
    let runtime = ''
    let hours =Math.floor(Number(props.runtime)/60)
    let min = Number(props.runtime)%60
    if(hours){
      runtime+=hours+' ч.'+'\u00A0\u00A0'
    }
    if(min){
      runtime+=min+' мин.'
    }

    let genres = 'Жанры: '
    let len = props.genres.length
    {props.genres.map((genre, index)=>{
      genres+=genre 
      if(index+1 != len){
        genres+=', '
      }
      
    })}

    return(
      <div className="filmCard">
        <img src={'https://shift-backend.onrender.com'+props.img} className="filmCardimg"></img>
        <div className="descriptoin">
          <p className="card-title">{props.name}<sup className="card-subtitle">&#40;{props.ageRating}&#41;</sup></p>
          <p className="card-subtitle">{runtime}</p>
          <p className="card-subtitle">{genres}</p>
          <div style={{display:"flex", gap: "0 10%"}}>
            <div style={{display:"inline-flex", gap: "0 10px"}}>
              <img src={kinopoisk}></img>
              <p className="card-subtitle">{props.userRatings.kinopoisk}</p>
            </div>
            <div style={{display:"inline-flex", gap: "0 10px"}}>
              <img src={imdb}></img>
              <p className="card-subtitle">{props.userRatings.imdb}</p>
            </div>
          </div>
        
        </div>
        <button className="button-more" onClick={props.onClick}>Подробнее</button>
      </div>
    )
  }