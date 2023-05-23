import{r as q,j as r}from"./index-9b290a96.js";import{U as mt,S as gt,D as ft,n as R,e as ht}from"./save_excel-a2e0605a.js";import{a as Y,C as kt}from"./axios-b8cd8f49.js";import{F as H,a as et,T as pt,P as nt,D as at,b as wt}from"./index-54f478fa.js";import{I as X,S as g,P as yt}from"./index-1a48d8c2.js";import{R as z,T as St}from"./EditOutlined-7301f64b.js";import{L as xt}from"./index-e2c7005c.js";import{S as Ct}from"./index-fed55c2c.js";async function M(C){try{let u=0,h,k;const _="https://starkscan.stellate.sh/",l={authority:"starkscan.stellate.sh",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},o={query:`query TransactionsTableQuery(
  $first: Int!
  $after: String
  $input: TransactionsInput!
) {
  ...TransactionsTablePaginationFragment_transactions_2DAjA4
}

fragment TransactionsTableExpandedItemFragment_transaction on Transaction {
  entry_point_selector_name
  calldata_decoded
  entry_point_selector
  calldata
  initiator_address
  initiator_identifier
  main_calls {
    selector
    selector_name
    calldata_decoded
    selector_identifier
    calldata
    contract_address
    contract_identifier
    id
  }
}

fragment TransactionsTablePaginationFragment_transactions_2DAjA4 on Query {
  transactions(first: $first, after: $after, input: $input) {
    edges {
      node {
        id
        ...TransactionsTableRowFragment_transaction
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment TransactionsTableRowFragment_transaction on Transaction {
  id
  transaction_hash
  block_number
  transaction_status
  transaction_type
  timestamp
  initiator_address
  initiator_identifier
  initiator {
    is_social_verified
    id
  }
  main_calls {
    selector_identifier
    id
  }
  ...TransactionsTableExpandedItemFragment_transaction
}
`,variables:{first:30,after:null,input:{initiator_address:C,transaction_types:["INVOKE_FUNCTION"],sort_by:"timestamp",order_by:"desc",min_block_number:null,max_block_number:null,min_timestamp:null,max_timestamp:null}}},d=await Y.post(_,o,{headers:l});u+=d.data.data.transactions.edges.length,h=d.data.data.transactions.pageInfo.hasNextPage;const x=d.data.data.transactions.edges[0].node.timestamp,i=new Date(x*1e3);let w=i.getFullYear(),y=i.getMonth()+1,p=i.getDate();y<10&&(y="0"+y),p<10&&(p="0"+p);let W=`${w}/${y}/${p}`;if(h===!0)for(k=d.data.data.transactions.pageInfo.endCursor;h;){o.variables.after=k;const L=await Y.post(_,o,{headers:l});h=L.data.data.transactions.pageInfo.hasNextPage,k=L.data.data.transactions.pageInfo.endCursor,u+=L.data.data.transactions.edges.length}return console.log(u,W),{tx:u,stark_latest_tx:W}}catch(u){return console.error(u),{tx:"Error",stark_latest_tx:"Error"}}}async function rt(C,u,h,k){for(let _=0;_<k.length;_++){const l=k[_].node;l.transaction_hash;const o=l.transfer_amount_display,d=l.transfer_from_address;l.timestamp,l.transfer_to_identifier;const x=l.main_call?l.main_call.selector_identifier:null;if(d==="0x0000000000000000000000000000000000000000000000000000000000000000"&&x==="handle_deposit"){const i=l.from_erc20_identifier;if(i in u){const w=u[i].amount+=parseFloat(o),y=u[i].count+=1;u[i]={amount:w,count:y}}else u[i]={amount:parseFloat(o),count:1}}else if(d===C&&x==="initiate_withdraw"){const i=l.from_erc20_identifier;if(i in h){const w=h[i].amount+=parseFloat(o),y=h[i].count+=1;h[i]={amount:w,count:y}}else h[i]={amount:parseFloat(o),count:1}}}return[u,h]}async function K(C){try{const u="https://starkscan.stellate.sh/",h={authority:"starkscan.stellate.sh",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},k={query:`query ERC20TransferEventsTableQuery(
  $first: Int!
  $after: String
  $input: ERC20TransferEventsInput!
) {
  ...ERC20TransferEventsTablePaginationFragment_erc20TransferEvents_2DAjA4
}

fragment ERC20TransferEventsTablePaginationFragment_erc20TransferEvents_2DAjA4 on Query {
  erc20TransferEvents(first: $first, after: $after, input: $input) {
    edges {
      node {
        id
        ...ERC20TransferEventsTableRowFragment_erc20TransferEvent
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment ERC20TransferEventsTableRowFragment_erc20TransferEvent on ERC20TransferEvent {
  id
  transaction_hash
  from_address
  from_erc20_identifier
  from_contract {
    is_social_verified
    id
  }
  transfer_from_address
  transfer_from_identifier
  transfer_from_contract {
    is_social_verified
    id
  }
  transfer_to_address
  transfer_to_identifier
  transfer_to_contract {
    is_social_verified
    id
  }
  transfer_amount
  transfer_amount_display
  timestamp
  main_call {
    selector_identifier
    id
  }
}
`,variables:{first:30,after:null,input:{transfer_from_or_to_address:C,call_invocation_type:"FUNCTION",sort_by:"timestamp",order_by:"desc"}}};let _=await Y.post(u,k,{headers:h}),l=_.data.data.erc20TransferEvents.edges,o={},d={},x=_.data.data.erc20TransferEvents.pageInfo.hasNextPage,i;for([o,d]=await rt(C,o,d,l),x&&(i=_.data.data.erc20TransferEvents.pageInfo.endCursor);x===!0;){k.variables.after=i;let p=await Y.post(u,k,{headers:h});x=p.data.data.erc20TransferEvents.pageInfo.hasNextPage,x===!1?i=null:i=p.data.data.erc20TransferEvents.pageInfo.endCursor,[o,d]=await rt(C,o,d,p.data.data.erc20TransferEvents.edges)}let w=0,y=0;for(let p in o)w+=o[p].count;for(let p in d)y+=d[p].count;return console.log(o),console.log(d),{d_eth_amount:o["StarkGate: ETH"]?parseFloat(o["StarkGate: ETH"].amount).toFixed(3):0,d_eth_count:o["StarkGate: ETH"]?o["StarkGate: ETH"].count:0,d_usdc_amount:o["StarkGate: USDC"]?parseFloat(o["StarkGate: USDC"].amount).toFixed(3):0,d_usdc_count:o["StarkGate: USDC"]?o["StarkGate: USDC"].count:0,d_usdt_amount:o["StarkGate: USDT"]?parseFloat(o["StarkGate: USDT"].amount).toFixed(3):0,d_usdt_count:o["StarkGate: USDT"]?o["StarkGate: USDT"].count:0,d_dai_amount:o["StarkGate: DAI"]?parseFloat(o["StarkGate: DAI"].amount).toFixed(3):0,d_dai_count:o["StarkGate: DAI"]?o["StarkGate: DAI"].count:0,d_wbtc_amount:o["StarkGate: WBTC"]?parseFloat(o["StarkGate: WBTC"].amount).toFixed(6):0,d_wbtc_count:o["StarkGate: WBTC"]?o["StarkGate: WBTC"].count:0,w_eth_amount:d["StarkGate: ETH"]?parseFloat(d["StarkGate: ETH"].amount).toFixed(3):0,w_eth_count:d["StarkGate: ETH"]?d["StarkGate: ETH"].count:0,w_usdc_amount:d["StarkGate: USDC"]?parseFloat(d["StarkGate: USDC"].amount).toFixed(3):0,w_usdc_count:d["StarkGate: USDC"]?d["StarkGate: USDC"].count:0,w_usdt_amount:d["StarkGate: USDT"]?parseFloat(d["StarkGate: USDT"].amount).toFixed(3):0,w_usdt_count:d["StarkGate: USDT"]?d["StarkGate: USDT"].count:0,w_dai_amount:d["StarkGate: DAI"]?parseFloat(d["StarkGate: DAI"].amount).toFixed(3):0,w_dai_count:d["StarkGate: DAI"]?d["StarkGate: DAI"].count:0,w_wbtc_amount:d["StarkGate: WBTC"]?parseFloat(d["StarkGate: WBTC"].amount).toFixed(6):0,w_wbtc_count:d["StarkGate: WBTC"]?d["StarkGate: WBTC"].count:0,total_deposit_count:w,total_widthdraw_count:y}}catch(u){return console.log(u),{d_eth_amount:"Error",d_eth_count:"Error",d_usdc_amount:"Error",d_usdc_count:"Error",d_usdt_amount:"Error",d_usdt_count:"Error",d_dai_amount:"Error",d_dai_count:"Error",d_wbtc_amount:"Error",d_wbtc_count:"Error",w_eth_amount:"Error",w_eth_count:"Error",w_usdc_amount:"Error",w_usdc_count:"Error",w_usdt_amount:"Error",w_usdt_count:"Error",w_dai_amount:"Error",w_dai_count:"Error",w_wbtc_amount:"Error",w_wbtc_count:"Error",total_deposit_count:"Error",total_widthdraw_count:"Error"}}}async function Q(C){try{const u="https://starkscan.stellate.sh/",h={authority:"starkscan.stellate.sh",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},k={query:`query ContractPageQuery(
  $input: ContractInput!
) {
  contract(input: $input) {
    contract_address
    is_starknet_class_code_verified
    implementation_type
    ...ContractPageOverviewTabFragment_contract
    ...ContractPageClassCodeHistoryTabFragment_contract
    ...ContractFunctionReadWriteTabFragment_contract
    id
  }
}

fragment ContractFunctionReadCallsFragment_starknetClass on StarknetClass {
  is_code_verified
  abi_final
}

fragment ContractFunctionReadWriteTabFragment_contract on Contract {
  contract_address
  starknet_class {
    ...ContractFunctionReadCallsFragment_starknetClass
    ...ContractFunctionWriteCallsFragment_starknetClass
    id
  }
}

fragment ContractFunctionWriteCallsFragment_starknetClass on StarknetClass {
  is_code_verified
  abi_final
}

fragment ContractPageClassCodeHistoryTabFragment_contract on Contract {
  contract_address
  starknet_class {
    is_code_verified
    id
  }
  ...ContractPageCodeSubTabFragment_contract
}

fragment ContractPageCodeSubTabFragment_contract on Contract {
  starknet_class {
    class_hash
    ...StarknetClassCodeTabFragment_starknetClass
    id
  }
}

fragment ContractPageOverviewTabClassHashPlacedAtItemFragment_contract on Contract {
  deployed_at_transaction_hash
  class_hash_placed_at_transaction_hash
  class_hash_placed_at_timestamp
}

fragment ContractPageOverviewTabEthBalanceItemFragment_contract on Contract {
  eth_balance {
    balance_display
    id
  }
}

fragment ContractPageOverviewTabFragment_contract on Contract {
  contract_address
  class_hash
  name_tag
  is_social_verified
  deployed_by_contract_address
  deployed_by_contract_identifier
  deployed_at_transaction_hash
  deployed_at_timestamp
  ...ContractPageOverviewTabEthBalanceItemFragment_contract
  ...ContractPageOverviewTabTypeItemFragment_contract
  ...ContractPageOverviewTabStarknetIDItemFragment_contract
  starknet_class {
    ...StarknetClassVersionItemFragment_starknetClass
    id
  }
  ...ContractPageOverviewTabClassHashPlacedAtItemFragment_contract
}

fragment ContractPageOverviewTabStarknetIDItemFragment_contract on Contract {
  starknet_id {
    domain
  }
}

fragment ContractPageOverviewTabTypeItemFragment_contract on Contract {
  implementation_type
  starknet_class {
    type
    id
  }
}

fragment StarknetClassCodeTabAbiAndByteCodeItemFragment_starknetClass on StarknetClass {
  is_code_verified
  abi_final
  bytecode
  sierra_program
}

fragment StarknetClassCodeTabFragment_starknetClass on StarknetClass {
  ...StarknetClassCodeTabVerifiedItemFragment_starknetClass
  ...StarknetClassCodeTabSourceCodeItemFragment_starknetClass
  ...StarknetClassCodeTabAbiAndByteCodeItemFragment_starknetClass
}

fragment StarknetClassCodeTabSourceCodeItemFragment_starknetClass on StarknetClass {
  class_hash
  verified {
    source_code
  }
}

fragment StarknetClassCodeTabVerifiedItemFragment_starknetClass on StarknetClass {
  is_code_verified
  verified {
    name
    source_code
    verified_at_timestamp
  }
}

fragment StarknetClassVersionItemFragment_starknetClass on StarknetClass {
  is_cairo_one
}
`,variables:{input:{contract_address:C}}},_=await Y.post(u,k,{headers:h}),l=_.data.data.contract.eth_balance.balance_display,o=_.data.data.contract.starknet_id?_.data.data.contract.starknet_id.domain:"null",d=_.data.data.contract.deployed_at_timestamp;return{eth_balance:parseFloat(l).toFixed(3),stark_id:o==="null"?"无":o,deployed_at_timestamp:d}}catch(u){return console.log(u),{eth_balance:"Error",stark_id:"Error",deployed_at_timestamp:"Error"}}}const{TextArea:bt}=X,{Content:Tt}=xt,Ot=()=>{const[C,u]=q.useState(!1),[h,k]=q.useState(!1),[_,l]=q.useState([]),[o]=H.useForm(),[d,x]=q.useState(!1),[i,w]=q.useState([]),[y,p]=q.useState(!1),[W]=H.useForm();q.useEffect(()=>{p(!0);const t=localStorage.getItem("stark_addresses");setTimeout(()=>{p(!1)},500),t&&l(JSON.parse(t))},[]);const L=t=>{l(_.filter(s=>s.key!==t)),localStorage.setItem("stark_addresses",JSON.stringify(_.filter(s=>s.key!==t)))},st=async()=>{try{const t=await W.validateFields();if(t.address.length!==66&&t.address.length!==64){R.error({message:"错误",description:"请输入正确的stark地址(64位)"},2);return}t.address.startsWith("0x")||(t.address="0x"+t.address),u(!1);const s=_.findIndex(n=>n.address===t.address);if(s!==-1){l(_.map((c,e)=>e===s?{...c,name:t.name}:c));const n=[..._];Q(t.address).then(({eth_balance:c,stark_id:e,deployed_at_timestamp:a})=>{n[s]={...n[s],stark_eth_balance:c,stark_id:e,create_time:a},l(n),localStorage.setItem("stark_addresses",JSON.stringify(_))}),K(t.address).then(({d_eth_amount:c,d_eth_count:e,d_usdc_amount:a,d_usdc_count:m,d_usdt_amount:f,d_usdt_count:S,d_dai_amount:b,d_dai_count:T,d_wbtc_amount:I,d_wbtc_count:F,w_eth_amount:E,w_eth_count:j,w_usdc_amount:v,w_usdc_count:D,w_usdt_amount:G,w_usdt_count:N,w_dai_amount:O,w_dai_count:P,w_wbtc_amount:U,w_wbtc_count:A,total_deposit_count:B,total_widthdraw_count:J})=>{n[s]={...n[s],d_eth_amount:c,d_eth_count:e,d_usdc_amount:a,d_usdc_count:m,d_usdt_amount:f,d_usdt_count:S,d_dai_amount:b,d_dai_count:T,d_wbtc_amount:I,d_wbtc_count:F,w_eth_amount:E,w_eth_count:j,w_usdc_amount:v,w_usdc_count:D,w_usdt_amount:G,w_usdt_count:N,w_dai_amount:O,w_dai_count:P,w_wbtc_amount:U,w_wbtc_count:A,total_deposit_count:B,total_widthdraw_count:J},l(n),localStorage.setItem("stark_addresses",JSON.stringify(_))}),M(t.address).then(({tx:c,stark_latest_tx:e})=>{n[s]={...n[s],stark_tx_amount:c,stark_latest_tx:e},l(n),localStorage.setItem("stark_addresses",JSON.stringify(_))})}else{const n={key:_.length.toString(),name:t.name,address:t.address,stark_eth_balance:null,stark_id:null,create_time:null,d_eth_amount:null,d_eth_count:null,d_usdc_amount:null,d_usdc_count:null,d_usdt_amount:null,d_usdt_count:null,d_dai_amount:null,d_dai_count:null,d_wbtc_amount:null,d_wbtc_count:null,w_eth_amount:null,w_eth_count:null,w_usdc_amount:null,w_usdc_count:null,w_usdt_amount:null,w_usdt_count:null,w_dai_amount:null,w_dai_count:null,w_wbtc_amount:null,w_wbtc_count:null,stark_tx_amount:null,stark_latest_tx:null,total_deposit_count:null,total_widthdraw_count:null},c=[..._,n];l(c),M(t.address).then(({tx:e,stark_latest_tx:a})=>{n.stark_tx_amount=e,n.stark_latest_tx=a,l([...c]),localStorage.setItem("stark_addresses",JSON.stringify(c))}),Q(t.address).then(({eth_balance:e,stark_id:a,deployed_at_timestamp:m})=>{n.stark_eth_balance=e,n.stark_id=a,n.create_time=m,l([...c]),localStorage.setItem("stark_addresses",JSON.stringify(c))}),K(t.address).then(({d_eth_amount:e,d_eth_count:a,d_usdc_amount:m,d_usdc_count:f,d_usdt_amount:S,d_usdt_count:b,d_dai_amount:T,d_dai_count:I,d_wbtc_amount:F,d_wbtc_count:E,w_eth_amount:j,w_eth_count:v,w_usdc_amount:D,w_usdc_count:G,w_usdt_amount:N,w_usdt_count:O,w_dai_amount:P,w_dai_count:U,w_wbtc_amount:A,w_wbtc_count:B,total_widthdraw_count:J,total_deposit_count:$})=>{n.d_eth_amount=e,n.d_eth_count=a,n.d_usdc_amount=m,n.d_usdc_count=f,n.d_usdt_amount=S,n.d_usdt_count=b,n.d_dai_amount=T,n.d_dai_count=I,n.d_wbtc_amount=F,n.d_wbtc_count=E,n.w_eth_amount=j,n.w_eth_count=v,n.w_usdc_amount=D,n.w_usdc_count=G,n.w_usdt_amount=N,n.w_usdt_count=O,n.w_dai_amount=P,n.w_dai_count=U,n.w_wbtc_amount=A,n.w_wbtc_count=B,n.total_deposit_count=$,n.total_widthdraw_count=J,l([...c]),localStorage.setItem("stark_addresses",JSON.stringify(c))})}}catch(t){R.error({message:"错误",description:t.message},2)}finally{W.resetFields()}},ot=async()=>{try{const s=(await o.validateFields()).addresses.split(`
`),n=[..._];for(let c of s){if(c=c.trim(),c.length!==66&&c.length!==64){R.error({message:"错误",description:"请输入正确的stark地址(64位)"});continue}c.startsWith("0x")||(c="0x"+c);const e=n.findIndex(a=>a.address===c);if(e!==-1){const a=[...n];M(c).then(({tx:m,stark_latest_tx:f})=>{a[e]={...a[e],stark_tx_amount:m,stark_latest_tx:f},l(a),localStorage.setItem("stark_addresses",JSON.stringify(a))}),Q(c).then(({eth_balance:m,stark_id:f,deployed_at_timestamp:S})=>{a[e]={...a[e],stark_eth_balance:m,stark_id:f,create_time:S},l(a),localStorage.setItem("stark_addresses",JSON.stringify(a))}),K(c).then(({d_eth_amount:m,d_eth_count:f,d_usdc_amount:S,d_usdc_count:b,d_usdt_amount:T,d_usdt_count:I,d_dai_amount:F,d_dai_count:E,d_wbtc_amount:j,d_wbtc_count:v,w_eth_amount:D,w_eth_count:G,w_usdc_amount:N,w_usdc_count:O,w_usdt_amount:P,w_usdt_count:U,w_dai_amount:A,w_dai_count:B,w_wbtc_amount:J,w_wbtc_count:$,total_widthdraw_count:V,total_deposit_count:Z})=>{a[e]={...a[e],d_eth_amount:m,d_eth_count:f,d_usdc_amount:S,d_usdc_count:b,d_usdt_amount:T,d_usdt_count:I,d_dai_amount:F,d_dai_count:E,d_wbtc_amount:j,d_wbtc_count:v,w_eth_amount:D,w_eth_count:G,w_usdc_amount:N,w_usdc_count:O,w_usdt_amount:P,w_usdt_count:U,w_dai_amount:A,w_dai_count:B,w_wbtc_amount:J,w_wbtc_count:$,total_widthdraw_count:V,total_deposit_count:Z}})}else{const a={key:n.length.toString(),address:c,stark_eth_balance:null,stark_id:null,create_time:null,d_eth_amount:null,d_eth_count:null,d_usdc_amount:null,d_usdc_count:null,d_usdt_amount:null,d_usdt_count:null,d_dai_amount:null,d_dai_count:null,d_wbtc_amount:null,d_wbtc_count:null,w_eth_amount:null,w_eth_count:null,w_usdc_amount:null,w_usdc_count:null,w_usdt_amount:null,w_usdt_count:null,w_dai_amount:null,w_dai_count:null,w_wbtc_amount:null,w_wbtc_count:null,stark_tx_amount:null,stark_latest_tx:null,total_deposit_count:null,total_widthdraw_count:null};n.push(a),l(n),M(c).then(({tx:m,stark_latest_tx:f})=>{a.stark_tx_amount=m,a.stark_latest_tx=f,l([...n]),localStorage.setItem("stark_addresses",JSON.stringify(n))}),Q(c).then(({eth_balance:m,stark_id:f,deployed_at_timestamp:S})=>{a.stark_eth_balance=m,a.stark_id=f,a.create_time=S,l([...n]),localStorage.setItem("stark_addresses",JSON.stringify(n))}),K(c).then(({d_eth_amount:m,d_eth_count:f,d_usdc_amount:S,d_usdc_count:b,d_usdt_amount:T,d_usdt_count:I,d_dai_amount:F,d_dai_count:E,d_wbtc_amount:j,d_wbtc_count:v,w_eth_amount:D,w_eth_count:G,w_usdc_amount:N,w_usdc_count:O,w_usdt_amount:P,w_usdt_count:U,w_dai_amount:A,w_dai_count:B,w_wbtc_amount:J,w_wbtc_count:$,total_widthdraw_count:V,total_deposit_count:Z})=>{a.d_eth_amount=m,a.d_eth_count=f,a.d_usdc_amount=S,a.d_usdc_count=b,a.d_usdt_amount=T,a.d_usdt_count=I,a.d_dai_amount=F,a.d_dai_count=E,a.d_wbtc_amount=j,a.d_wbtc_count=v,a.w_eth_amount=D,a.w_eth_count=G,a.w_usdc_amount=N,a.w_usdc_count=O,a.w_usdt_amount=P,a.w_usdt_count=U,a.w_dai_amount=A,a.w_dai_count=B,a.w_wbtc_amount=J,a.w_wbtc_count=$,a.total_widthdraw_count=V,a.total_deposit_count=Z,l([...n]),localStorage.setItem("stark_addresses",JSON.stringify(n))})}}k(!1)}catch(t){R.error({message:"错误",description:t.message})}finally{o.resetFields(),w([])}},lt=async()=>{if(!i.length){R.error({message:"错误",description:"请先选择要刷新的地址"},2);return}x(!0);try{let t=[];const s=[..._];for(let n of i){const c=s.findIndex(e=>e.key===n);if(c!==-1){const e=s[c];e.stark_tx_amount=null,e.stark_latest_tx=null,e.stark_eth_balance=null,e.stark_id=null,e.create_time=null,e.d_eth_amount=null,e.d_eth_count=null,e.d_usdc_amount=null,e.d_usdc_count=null,e.d_usdt_amount=null,e.d_usdt_count=null,e.d_dai_amount=null,e.d_dai_count=null,e.d_wbtc_amount=null,e.d_wbtc_count=null,e.w_eth_amount=null,e.w_eth_count=null,e.w_usdc_amount=null,e.w_usdc_count=null,e.w_usdt_amount=null,e.w_usdt_count=null,e.w_dai_amount=null,e.w_dai_count=null,e.w_wbtc_amount=null,e.w_wbtc_count=null,e.total_widthdraw_count=null,e.total_deposit_count=null,l([...s]),t.push(M(e.address).then(({tx:a,stark_latest_tx:m})=>{e.stark_tx_amount=a,e.stark_latest_tx=m,l([...s]),localStorage.setItem("stark_addresses",JSON.stringify(_))})),t.push(Q(e.address).then(({eth_balance:a,stark_id:m,deployed_at_timestamp:f})=>{e.stark_eth_balance=a,e.stark_id=m,e.create_time=f,l([...s]),localStorage.setItem("stark_addresses",JSON.stringify(_))})),t.push(K(e.address).then(({d_eth_amount:a,d_eth_count:m,d_usdc_amount:f,d_usdc_count:S,d_usdt_amount:b,d_usdt_count:T,d_dai_amount:I,d_dai_count:F,d_wbtc_amount:E,d_wbtc_count:j,w_eth_amount:v,w_eth_count:D,w_usdc_amount:G,w_usdc_count:N,w_usdt_amount:O,w_usdt_count:P,w_dai_amount:U,w_dai_count:A,w_wbtc_amount:B,w_wbtc_count:J,total_widthdraw_count:$,total_deposit_count:V})=>{e.d_eth_amount=a,e.d_eth_count=m,e.d_usdc_amount=f,e.d_usdc_count=S,e.d_usdt_amount=b,e.d_usdt_count=T,e.d_dai_amount=I,e.d_dai_count=F,e.d_wbtc_amount=E,e.d_wbtc_count=j,e.w_eth_amount=v,e.w_eth_count=D,e.w_usdc_amount=G,e.w_usdc_count=N,e.w_usdt_amount=O,e.w_usdt_count=P,e.w_dai_amount=U,e.w_dai_count=A,e.w_wbtc_amount=B,e.w_wbtc_count=J,e.total_widthdraw_count=$,e.total_deposit_count=V,l([...s]),localStorage.setItem("stark_addresses",JSON.stringify(_))}))}}await Promise.all(t)}catch(t){R.error({message:"错误",description:t.message},2)}finally{x(!1),w([])}},dt=()=>{if(!i.length){R.error({message:"错误",description:"请先选择要删除的地址"},2);return}l(_.filter(t=>!i.includes(t.key))),localStorage.setItem("stark_addresses",JSON.stringify(_.filter(t=>!i.includes(t.key)))),w([])},ct=()=>{ht(_,"starkInfo")},[_t,tt]=q.useState(null),it=[{title:"#",key:"index",align:"center",render:(t,s,n)=>n+1},{title:"备注",dataIndex:"name",key:"name",align:"center",className:"name",render:(t,s)=>s.key===_t?r.jsx(X,{placeholder:"请输入备注",defaultValue:t,onPressEnter:c=>{s.name=c.target.value,l([..._]),localStorage.setItem("stark_addresses",JSON.stringify(_)),tt(null)}}):r.jsxs(r.Fragment,{children:[r.jsx(wt,{color:"blue",children:t}),r.jsx(z,{shape:"circle",icon:r.jsx(St,{}),size:"small",onClick:()=>tt(s.key)})]})},{title:"钱包地址",dataIndex:"address",key:"address",align:"center",className:"address",render:(t,s)=>t===null?r.jsx(g,{}):t.slice(0,4)+"..."+t.slice(-4)},{title:"创建时间",dataIndex:"create_time",key:"create_time",align:"center",className:"create_time",render:(t,s)=>{if(t===null)return r.jsx(g,{});{let n=new Date(t*1e3),c=n.getFullYear(),e=(n.getMonth()+1).toString().padStart(2,"0"),a=n.getDate().toString().padStart(2,"0");return`${c}/${e}/${a}`}}},{title:"StarkId",dataIndex:"stark_id",key:"stark_id",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"StarkWare",className:"zksync2",children:[{title:"ETH",dataIndex:"stark_eth_balance",key:"stark_eth_balance",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"Tx",dataIndex:"stark_tx_amount",key:"stark_tx_amount",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"最后交易时间",dataIndex:"stark_latest_tx",key:"stark_latest_tx",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"官方桥Tx数量",className:"stark_cross_tx",children:[{title:"L1->L2",children:[{title:"ETH",dataIndex:"d_eth_count",key:"12cross_eth_tx",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"USDT",dataIndex:"d_usdt_count",key:"12cross_usdt_tx",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"USDC",dataIndex:"d_usdc_count",key:"12cross_usdc_tx",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"总计",dataIndex:"total_deposit_count",key:"12cross_total_tx",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t}]},{title:"L2->L1",className:"cross21",children:[{title:"ETH",dataIndex:"w_eth_count",key:"21cross_eth_tx",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"USDT",dataIndex:"w_usdt_count",key:"21cross_usdt_tx",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"USDC",dataIndex:"w_usdc_count",key:"21cross_usdc_tx",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"总计",dataIndex:"total_widthdraw_count",key:"21cross_total_tx",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t}]}]},{title:"官方桥跨链额",className:"stark_cross_amount",children:[{title:"L1->L2",children:[{title:"ETH",dataIndex:"d_eth_amount",key:"12cross_eth_amount",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"USDT",dataIndex:"d_usdt_amount",key:"12cross_usdt_amount",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"USDC",dataIndex:"d_usdc_amount",key:"12cross_usdc_amount",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t}]},{title:"L2->L1",className:"cross21",children:[{title:"ETH",dataIndex:"w_eth_amount",key:"21cross_eth_amount",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"USDT",dataIndex:"w_usdt_amount",key:"21cross_usdt_amount",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t},{title:"USDC",dataIndex:"w_usdc_amount",key:"21cross_usdc_amount",align:"center",render:(t,s)=>t===null?r.jsx(g,{}):t}]}]},{title:"操作",key:"action",align:"center",render:(t,s)=>r.jsx(Ct,{size:"small",children:r.jsx(nt,{title:"确认删除？",onConfirm:()=>L(s.key),children:r.jsx(z,{icon:r.jsx(at,{})})})})}]}],ut={selectedRowKeys:i,onChange:t=>{w(t)}};return r.jsx("div",{children:r.jsxs(Tt,{children:[r.jsx(et,{title:"批量添加地址",open:h,onOk:ot,onCancel:()=>{k(!1),o.resetFields()},okText:"添加地址",cancelText:"取消",children:r.jsx(H,{form:o,layout:"vertical",children:r.jsx(H.Item,{label:"地址",name:"addresses",rules:[{required:!0}],children:r.jsx(bt,{placeholder:"请输入地址，每行一个",style:{width:"500px",height:"200px"}})})})}),r.jsx(et,{title:"添加地址",open:C,onOk:st,onCancel:()=>u(!1),okText:"添加地址",cancelText:"取消",children:r.jsxs(H,{form:W,layout:"vertical",children:[r.jsx(H.Item,{label:"地址",name:"address",rules:[{required:!0}],children:r.jsx(X,{placeholder:"请输入地址"})}),r.jsx(H.Item,{label:"备注",name:"name",children:r.jsx(X,{placeholder:"请输入备注"})})]})}),r.jsx(g,{spinning:y,children:r.jsx(pt,{rowSelection:ut,dataSource:_,pagination:!1,bordered:!0,style:{marginBottom:"20px"},size:"small",columns:it})}),r.jsx(kt,{children:r.jsxs("div",{style:{width:"100%",display:"flex",justifyContent:"space-between"},children:[r.jsx(z,{type:"primary",onClick:()=>{u(!0)},size:"large",style:{width:"20%"},icon:r.jsx(yt,{}),children:"添加地址"}),r.jsx(z,{type:"primary",onClick:()=>{k(!0)},size:"large",style:{width:"20%"},icon:r.jsx(mt,{}),children:"批量添加地址"}),r.jsx(z,{type:"primary",onClick:lt,loading:d,size:"large",style:{width:"20%"},icon:r.jsx(gt,{}),children:"刷新选中地址"}),r.jsx(nt,{title:"确认删除"+i.length+"个地址？",onConfirm:dt,children:r.jsx(z,{type:"primary",danger:!0,size:"large",style:{width:"20%"},icon:r.jsx(at,{}),children:"删除选中地址"})}),r.jsx(z,{type:"primary",icon:r.jsx(ft,{}),size:"large",style:{width:"8%"},onClick:ct})]})})]})})};export{Ot as default};
