export default((a,b,c,d)=>{var e=Math.round;let f,g,h,k,l,m,n,o=c.length;for(f=0;f<o;f++)for(h=c[f],g=b[h.name.toLowerCase()];a[g]&&a[g][0].name()===h.name.toLowerCase();){if(l=a[g],d===l[2])return{unit:h,multiplier:l[1]};if(d<l[2])return m?(n=e((l[2]+m[2])/2),d<n?{unit:k,multiplier:m[1]}:{unit:h,multiplier:l[1]}):{unit:h,multiplier:l[1]};m=l,k=h,g++}return{unit:c[f-1],multiplier:e(d/c[f-1].ms)}});