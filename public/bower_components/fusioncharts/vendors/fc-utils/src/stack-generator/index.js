import isArray from'../type/is-array';import constant from'../../../fc-core/src/axis/utils/constant';import orderDefault from'./orders/default';import offsetDefault from'./offsets/default';const stackValue=(a,b)=>a[b];class StackGenerator{constructor(){this.keysAccessor=constant([]),this.order=orderDefault,this.offset=offsetDefault,this.valueAccessor=stackValue}generate(a){let b,c,d=this.keysAccessor(a),e=a.length,f=d.length,g=Array(f);for(b=0;b<f;++b){let c,f,h=d[b],i=Array(e);for(g[b]=i,f=0;f<e;++f)c=[0,+this.valueAccessor(a[f],h,f,a)],c.data=a[f],i[f]=c;i.key=h}for(c=this.order(g),b=0;b<f;++b)g[c[b]].index=b;return this.offset(g,c),g}setKeysAccessor(a=constant([])){return this.keysAccessor='function'==typeof a?a:constant(isArray(a)?a.slice():[]),this}getKeysAccessor(){return this.keysAccessor}setValueAccessor(a=stackValue){return this.valueAccessor='function'==typeof a?a:constant(+a),this}getValueAccessor(){return this.valueAccessor}setOrder(a=orderDefault){return this.order='function'==typeof a?a:constant(isArray(a)?a.slice():[]),this}getOrder(){return this.order}setOffset(a=offsetDefault){return this.offset=a,this}getOffset(){return this.offset}}export default StackGenerator;