import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //permite que el servicio pueda estar definido en el momento que se construye el bundle de la app
                    // no hace falta que lo declare en providers
})
export class GifsService {

    private apiKey: string='u4PEMGl8lZe1Zww9mzKTVskUQYpiFZJW';
    private servicioUrl: string ='https://api.giphy.com/v1/gifs';
    private _historial:string[]=[]
    public resultados: Gif[]=[]

    get historial(){
      
      return [...this._historial];
    }

    constructor(private http:HttpClient){

      this._historial=JSON.parse(localStorage.getItem('historial')!) || []
      this.resultados=JSON.parse(localStorage.getItem('resultados')!) || []

      /*if(localStorage.getItem('historial')){
        this._historial=JSON.parse(localStorage.getItem('historial')!)

      }*/

    }

    buscarGifs(query:string=''){

      query=query.trim().toLocaleLowerCase();
      
      if(!this._historial.includes(query)){
        this._historial.unshift(query);
        this._historial=this._historial.splice(0,10);
        localStorage.setItem('historial', JSON.stringify(this._historial));

      }

      const params = new HttpParams()
            .set('api_key',this.apiKey)
            .set('limit','10')
            .set('q', query);

      console.log(params.toString())

      this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
          .subscribe((resp: any)=>{
            this.resultados=resp.data;
            localStorage.setItem('resultados', JSON.stringify(this.resultados));
          })

      
      

      console.log(this._historial);

    }
  
}
