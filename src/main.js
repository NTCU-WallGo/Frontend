import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const target=document.getElementById('app')
if(!target){
  throw new Error("找不到掛載點");
}
const app = mount(App, {
  target: target,
})

export default app
