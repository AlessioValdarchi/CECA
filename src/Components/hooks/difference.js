import {store} from '../../app/store'
import {customSlice} from '../../Features/customSlice'

let storage = store.getState()

let temp = storage.difference.map(el=> Object.entries(el.RAW))
let setted =  Array.from(new Set(temp.flat().sort().map(el=>el[0])))
let data=temp.flat().sort().map(el=>el)
const cheapest = []
for (let item of setted){
   let single = data.filter(el=> el[0] === item)
   cheapest.push(single)
}

let temporaneo = []
for (let item of cheapest){
   temporaneo.push(item.map(el=> el[1]).map(el=> el))
}
const final = []

for (let item of temporaneo){
final.push(item.reduce((acc, cur)=>(acc < cur.USDT.PRICE ? acc : cur),
))}
const RAW = []
setted.forEach((el,index)=>{
    RAW.push({[el]: final[index]})
})

setTimeout(()=>(store.dispatch(customSlice.actions.sendCustom(RAW))), 5000)


