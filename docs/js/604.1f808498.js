"use strict";(self["webpackChunkconcert_club"]=self["webpackChunkconcert_club"]||[]).push([[604],{884:function(s,e,t){t.d(e,{Z:function(){return p}});var o=t(3396),n=t(7139);const i=["data-post-id"],r={class:"post-preview-title"},l={class:"post-preview-text"};function a(s,e,t,a,c,d){const u=(0,o.up)("router-link");return(0,o.wg)(),(0,o.j4)(u,{to:"/chosen-post"},{default:(0,o.w5)((()=>[(0,o._)("div",{class:(0,n.C_)(["post-preview-card",[t.anotherClass]]),"data-post-id":[t.postId],onClick:e[0]||(e[0]=e=>s.$emit("handleClickOnPostCard",e))},[(0,o._)("p",r,(0,n.zw)(t.postTitle),1),(0,o._)("p",l,(0,n.zw)(t.postText),1)],10,i)])),_:1})}var c={name:"PostPreview",props:{postTitle:String,postText:String,anotherClass:String,postId:Number},emits:["handleClickOnPostCard"]},d=t(89);const u=(0,d.Z)(c,[["render",a],["__scopeId","data-v-439f9600"]]);var p=u},9604:function(s,e,t){t.r(e),t.d(e,{default:function(){return q}});var o=t(3396),n=t(7139),i=t(9242);const r=s=>((0,o.dD)("data-v-1af88dcb"),s=s(),(0,o.Cn)(),s),l={class:"main"},a={class:"user-section"},c={class:"user-section-data"},d={class:"user-name"},u=r((()=>(0,o._)("div",{class:"black-line"},null,-1))),p={class:"user-data"},h={class:"user-city"},k={class:"user-email"},P={class:"user-phone"},C={class:"user-website"},w={class:"user-company"},v={class:"user-bs"},g=r((()=>(0,o._)("div",{class:"black-line"},null,-1))),_={class:"user-section-posts"},f=r((()=>(0,o._)("div",{class:"black-line"},null,-1))),m={class:"posts-container"},b=r((()=>(0,o._)("h4",{class:"section-title user-section-posts-title"},"Посты",-1))),T={class:"posts-preview"},y={key:3,class:"user-section-error"},O={class:"user-section-button-container"},x=r((()=>(0,o._)("div",{class:"black-line user-section-black-line"},null,-1)));function S(s,e,t,r,S,z){const $=(0,o.up)("ClockLoader"),I=(0,o.up)("PostPreview"),L=(0,o.up)("ButtonComponent"),A=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("main",l,[(0,o._)("div",a,[(0,o._)("div",c,[(0,o._)("h5",d,(0,n.zw)(z.chosenProfile.username),1)]),u,(0,o._)("div",p,[(0,o._)("div",h,(0,n.zw)(z.chosenProfile.name),1),(0,o._)("div",k,(0,n.zw)(z.chosenProfile.email),1),(0,o._)("div",P,(0,n.zw)(z.chosenProfile.phone),1),(0,o._)("div",C,(0,n.zw)(z.chosenProfile.website),1),(0,o._)("div",w,[(0,o._)("p",null,(0,n.zw)(z.chosenProfile.company.name),1),(0,o._)("p",v,(0,n.zw)(z.chosenProfile.company.bs),1)])]),g,(0,o._)("div",_,[f,(0,o._)("div",m,[b,(0,o._)("div",T,[z.isLoading?((0,o.wg)(),(0,o.j4)($,{key:0})):(0,o.kq)("",!0),!z.posts.length||z.allPostsAreShown||z.isLoading?z.posts.length&&z.allPostsAreShown&&!z.isLoading?((0,o.wg)(!0),(0,o.iD)(o.HY,{key:2},(0,o.Ko)(z.posts,(t=>((0,o.wg)(),(0,o.j4)(I,{key:t.id,postTitle:t.title,postText:t.body.substr(0,50)+"...",anotherClass:"",postId:t.id,onHandleClickOnPostCard:e[1]||(e[1]=e=>s.handleClickOnPostCard(e))},null,8,["postTitle","postText","postId"])))),128)):(0,o.kq)("",!0):((0,o.wg)(!0),(0,o.iD)(o.HY,{key:1},(0,o.Ko)(z.firstPosts,(t=>((0,o.wg)(),(0,o.j4)(I,{key:t.id,postTitle:t.title,postText:t.body.substr(0,50)+"...",anotherClass:"",postId:t.id,onHandleClickOnPostCard:e[0]||(e[0]=e=>s.handleClickOnPostCard(e))},null,8,["postTitle","postText","postId"])))),128)),z.errorTextForPosts?((0,o.wg)(),(0,o.iD)("div",y,(0,n.zw)(z.errorTextForPosts),1)):(0,o.kq)("",!0)]),!z.posts.length||z.isLoading||z.allPostsAreShown?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("a",{key:0,href:"#",class:"user-section-link",onClick:e[2]||(e[2]=(0,i.iM)(((...e)=>s.handleClickOnlink&&s.handleClickOnlink(...e)),["prevent"]))}," Развернуть →")),z.posts.length&&!z.isLoading&&z.allPostsAreShown?((0,o.wg)(),(0,o.iD)("a",{key:1,href:"#",class:"user-section-link user-section-link_up",onClick:e[3]||(e[3]=(0,i.iM)(((...e)=>s.handleClickOnlink&&s.handleClickOnlink(...e)),["prevent"]))}," Свернуть ↑")):(0,o.kq)("",!0)]),(0,o._)("div",O,[(0,o.Wm)(A,{to:"/posts"},{default:(0,o.w5)((()=>[(0,o.Wm)(L,{anotherClass:"user-section-button",buttonText:"Смотреть публикации",onClick:e[4]||(e[4]=e=>s.$emit("handleClickOnCard",e))})])),_:1})]),x])])])}var z=t(3683),$=t(884),I=t(6106),L=t(65),A={name:"AboutView",components:{ButtonComponent:z.Z,PostPreview:$.Z,ClockLoader:I.Z},mounted(){this.$store.dispatch("getChosenProfilePosts")},computed:{errorTextForPosts(){return this.$store.getters.errorTextForPosts},posts(){return this.$store.getters.posts},firstPosts(){return this.$store.getters.firstPosts},chosenProfile(){const s=this.checkCosenPerson();return s},isLoading(){return this.$store.getters.isLoading},allPostsAreShown(){return this.$store.getters.allPostsAreShown}},methods:{...(0,L.nv)({handleClickOnlink:"showAllPosts",handleClickOnPostCard:"getChosenPost"}),checkCosenPerson(){let s;return s=null===this.$store.getters.chosenProfile?JSON.parse(sessionStorage.getItem("chosenPerson")):this.$store.getters.chosenProfile,s}}},D=t(89);const Z=(0,D.Z)(A,[["render",S],["__scopeId","data-v-1af88dcb"]]);var q=Z}}]);
//# sourceMappingURL=604.1f808498.js.map