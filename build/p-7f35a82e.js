import{c as t}from"./p-74529b1d.js";import{g as o}from"./p-400cacc1.js";import"./p-c73722f4.js";import"./p-f8ec8bf0.js";const r=(r,i)=>{const a="back"===i.direction,c=i.leavingEl,s=o(i.enteringEl),p=s.querySelector("ion-toolbar"),e=t();if(e.addElement(s).fill("both").beforeRemoveClass("ion-page-invisible"),a?e.duration(i.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):e.duration(i.duration||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform","translateY(40px)","translateY(0px)").fromTo("opacity",.01,1),p){const o=t();o.addElement(p),e.addAnimation(o)}if(c&&a){e.duration(i.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)");const r=t();r.addElement(o(c)).onFinish((t=>{1===t&&r.elements.length>0&&r.elements[0].style.setProperty("display","none")})).fromTo("transform","translateY(0px)","translateY(40px)").fromTo("opacity",1,0),e.addAnimation(r)}return e};export{r as mdTransitionAnimation}