<script setup>
const hoveredTab = ref('')
function hoverHandler(tab) {
  hoveredTab.value = tab
}
</script>

<template>
  <main>
    <div class="wrap">
      <div
        class="item"
        data-order="里程碑七 角色端建置 william"
        :class="{ 'item-hover': hoveredTab === 'william' }"
        style="
          background-image: url('https://firebasestorage.googleapis.com/v0/b/my-first-project-1110913.appspot.com/o/104social%2FIMG_5026.jpg?alt=media&token=3b6a7749-3065-4179-8ac9-6a93446307ae"
        @mouseenter="hoverHandler('william')"
      ></div>
      <div
        class="item"
        data-order="2"
        :class="{ 'item-hover': hoveredTab === '2' }"
        @mouseenter="hoverHandler('2')"
      ></div>
      <div
        class="item"
        data-order="3"
      ></div>
      <div
        class="item"
        data-order="4"
      ></div>
      <div
        class="item"
        data-order="5"
      ></div>
      <div
        class="item"
        data-order="6"
      ></div>
    </div>

    <transition name="slide">
      <article
        v-if="hoveredTab === 'william'"
        class="article container mt-6"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
        laudantium delectus qui veritatis? Aperiam magnam nesciunt reiciendis
        incidunt impedit ad accusantium velit quaerat, expedita nulla eum sint
        blanditiis nihil neque. Vel tempore reiciendis officia quidem atque eos,
        asperiores qui tempora ad ducimus, inventore adipisci quae quibusdam
        dicta maxime hic incidunt recusandae, fugiat officiis minima
        voluptatibus. Voluptatibus repellendus quisquam fuga sint dignissimos
        excepturi perspiciatis nostrum modi, doloremque commodi consequatur
        eveniet. Voluptates consectetur, libero incidunt doloribus aliquid iusto
        corporis vitae eligendi, quod iste sunt distinctio nobis necessitatibus
        nostrum sequi rerum non velit repudiandae repellendus fuga eius
        expedita. Reprehenderit accusamus aspernatur adipisci voluptates
        asperiores sed nesciunt quidem nulla earum, sapiente excepturi cumque
        fugiat tempora, velit, odio blanditiis qui? At, mollitia veritatis.
        Animi iusto temporibus dolore quasi ratione voluptates eum nihil, nobis
        sit quae non iste aut molestias dicta aliquid nisi inventore eius
        quibusdam qui, sapiente nesciunt repellendus nulla! Ipsum voluptas enim
        tempora odio repudiandae tempore fugiat adipisci commodi obcaecati
        repellat ratione culpa sequi totam assumenda deserunt, repellendus illum
        quibusdam? Quam, dicta minus. Dolores autem molestias error tenetur!
        Fuga asperiores illum recusandae sit provident. Veniam odit maiores nisi
        asperiores, assumenda aspernatur alias nemo suscipit modi molestias
        sapiente quos quisquam non, voluptas quo sit voluptate beatae. Dolores,
        doloremque mollitia quis asperiores nemo consequuntur perspiciatis
        voluptate officiis esse excepturi amet quaerat! Aliquid nulla ipsa
        facere iusto quis voluptates molestias corrupti tenetur voluptatum
        beatae explicabo reiciendis sed aliquam vitae eius quaerat quasi, autem
        commodi nostrum amet nesciunt fuga dicta vel pariatur! Perspiciatis,
        reiciendis aperiam rerum animi ut a debitis consequuntur distinctio quos
        velit voluptas laboriosam doloribus qui sequi temporibus adipisci
        delectus eveniet officia quas magni odit. Fugiat, velit quos eum
        voluptas animi, ullam veniam, ex labore blanditiis quidem iure aut
        incidunt ipsam dolor doloremque deserunt reprehenderit alias fuga minima
        molestias beatae asperiores accusantium voluptates mollitia. Incidunt
        laborum temporibus ratione eius at delectus minus quas cumque non
        perferendis nulla deserunt, consequatur, assumenda quibusdam rerum ea
        voluptatem! Quae tenetur quas quaerat. Fuga unde quas ducimus sed qui
        cupiditate quibusdam, nostrum error voluptate repudiandae labore alias
        laborum libero placeat, sint illo consequatur dolores officiis. Ratione,
        a nam at aut temporibus aliquam culpa veritatis ea sed doloremque quasi,
        perspiciatis, repudiandae cupiditate corporis eos! Commodi quisquam
        sequi quidem incidunt, asperiores voluptatum rem sit velit ut
        repellendus! Iste ea cumque, eveniet quod aliquid cum alias aut dolores
        modi qui rerum consectetur odit commodi vel illo accusamus laboriosam,
        quis corporis natus quasi expedita asperiores voluptates? Ullam
        laudantium esse eaque pariatur eveniet. Quisquam nobis aut impedit vero
        eveniet, necessitatibus molestiae alias magnam saepe et at assumenda
        expedita, tempora distinctio optio! Doloremque labore maxime aspernatur,
        accusantium doloribus adipisci sit quibusdam dolore quaerat unde illum
        blanditiis dignissimos! Repudiandae, quisquam maxime qui nesciunt ab
        beatae, voluptatibus quidem, corporis ducimus natus nam? Voluptatibus
        facilis quae aspernatur fugit dolorum ex itaque quo molestiae, quod
        nostrum neque eveniet tempora libero dolore ut. Fugit laborum dolores
        aspernatur, corrupti impedit illum perspiciatis suscipit minus quos
        omnis earum, consequuntur doloribus sunt nisi obcaecati asperiores
        dolore ducimus nihil esse libero repellendus iusto corporis soluta
        voluptas. Quaerat, alias totam odit ut fugiat, quos beatae pariatur
        magni aliquid veniam, dicta excepturi quam illo repellendus architecto
        cum. Beatae cumque soluta odit itaque deleniti quos pariatur mollitia
        illo ipsa? Soluta libero modi numquam quae harum? In, rem recusandae
        officia hic quia doloribus doloremque expedita, ipsum rerum excepturi
        corporis. Omnis vitae possimus excepturi! Molestias ipsum consequuntur
        nostrum mollitia illum sapiente nemo at vitae sequi minima numquam
        excepturi nisi cum aliquid nulla accusantium alias fuga ex, deleniti sit
        non accusamus iure dolor quod. Quod molestias sint nobis, dolorum eaque
        distinctio soluta esse inventore, amet dolor ut optio earum quis?
        Placeat quaerat debitis dolorum quis beatae ipsum, facere quas. Ex
        nostrum deleniti quo recusandae maxime autem qui repellendus enim
        laudantium asperiores? Excepturi, optio voluptas! Fugit eligendi
        veritatis, ullam nihil consequuntur animi praesentium officiis quidem
        nesciunt illo facere recusandae molestiae architecto debitis quaerat.
        Est quas praesentium facilis iure corrupti rerum cumque vel, veniam,
        doloribus officiis libero labore. Numquam molestias accusamus pariatur
        voluptatem facilis quaerat beatae, dicta, cupiditate obcaecati delectus
        voluptatibus nobis possimus quibusdam corrupti! Quisquam nam voluptatem,
        inventore reiciendis sint blanditiis animi eius aut quis, consequuntur,
        illum distinctio ex delectus culpa maxime. Recusandae, repellendus quos.
        Soluta similique necessitatibus laborum nostrum laboriosam! Iste et ex
        dignissimos quisquam ea illum quasi. Porro saepe accusamus assumenda
        aliquid vel corporis suscipit natus, veniam iste at quis, dolore facere
        asperiores inventore? Voluptates optio at eos architecto nulla qui unde
        atque nostrum similique dolores error sapiente facilis, quod tenetur
        doloremque, sequi distinctio deleniti. Iure reprehenderit eligendi porro
        ullam quam nesciunt tempora deserunt similique aperiam! Exercitationem
        voluptatibus at quaerat voluptate natus laborum eum accusantium ipsam
        nihil nostrum, repellendus sapiente, minima dolores dolor, ullam ex
        dolorum optio! Voluptatum maxime eius facilis quaerat, vero id
        asperiores tenetur, in commodi ad necessitatibus sequi. Ad, minima
        recusandae! Sequi dolores quia sint et exercitationem maxime perferendis
        sed tenetur hic dignissimos. Eum dolorum temporibus eligendi aperiam
        laboriosam ea explicabo sit earum, nobis nesciunt nostrum tempora, hic
        ut ullam fugit quisquam, in doloribus ratione. Dicta aut non suscipit
        voluptas esse aliquid nulla! Ducimus error hic voluptatum iure quasi
        fuga nihil cum ullam maiores, molestias doloribus at obcaecati optio
        soluta blanditiis ex quas nulla, quo adipisci a veritatis? Quisquam,
        illum? Fugit delectus sint, et consequuntur sequi recusandae nemo
        dolores omnis? Quam alias eligendi amet quas voluptatibus vero esse
        deserunt, ipsum necessitatibus cum nesciunt suscipit minima ipsa, quo
        sint qui voluptas, adipisci harum architecto tenetur ducimus eum
        pariatur similique. Excepturi ducimus similique vitae quia dolor est
        nesciunt voluptas ipsam veniam quod nostrum, voluptatibus officiis eos
        eum incidunt aliquam sapiente, aliquid dignissimos itaque ea ut,
        expedita nam commodi in! Dolores expedita obcaecati necessitatibus
        consectetur exercitationem architecto. Quaerat aspernatur ullam,
        molestias doloribus maxime optio odit laborum dolor voluptatibus amet
        quia cupiditate voluptates distinctio voluptatem, animi voluptatum
        eveniet. Quam dicta ut natus modi obcaecati a id quae sint quod possimus
        reprehenderit quisquam, laborum perferendis, totam maiores in
        repudiandae, voluptatum sunt labore vitae molestias iure quaerat
        incidunt voluptates? Magnam et illum inventore at! Praesentium, dolore
        laboriosam accusamus numquam expedita iusto alias at vel?
      </article>
    </transition>
    <transition name="slide">
      <article
        v-if="hoveredTab === '2'"
        class="article container mt-6"
      >
        222222222222 ctetur adipisicing elit. Voluptatem laudantium delectus qui
        veritatis? Aperiam magnam nesciunt reiciendis incidunt impedit ad
        accusantium velit quaerat, expedita nulla eum sint blanditiis nihil
        neque. Vel tempore reiciendis officia quidem atque eos, asperiores qui
        tempora ad ducimus, inventore adipisci quae quibusdam dicta maxime hic
        incidunt recusandae, fugiat officiis minima voluptatibus. Voluptatibus
        repellendus quisquam fuga sint dignissimos excepturi perspiciatis
        nostrum modi, doloremque commodi consequatur eveniet. Voluptates
        consectetur, libero incidunt doloribus aliquid iusto corporis vitae
        eligendi, quod iste sunt distinctio nobis necessitatibus nostrum sequi
        rerum non velit repudiandae repellendus fuga eius expedita.
        Reprehenderit accusamus aspernatur adipisci voluptates asperiores sed
        nesciunt quidem nulla earum, sapiente excepturi cumque fugiat tempora,
        velit, odio blanditiis qui? At, mollitia veritatis. Animi iusto
        temporibus dolore quasi ratione voluptates eum nihil, nobis sit quae non
        iste aut molestias dicta aliquid nisi inventore eius quibusdam qui,
        sapiente nesciunt repellendus nulla! Ipsum voluptas enim tempora odio
        repudiandae tempore fugiat adipisci commodi obcaecati repellat ratione
        culpa sequi totam assumenda deserunt, repellendus illum quibusdam? Quam,
        dicta minus. Dolores autem molestias error tenetur! Fuga asperiores
        illum recusandae sit provident. Veniam odit maiores nisi asperiores,
        assumenda aspernatur alias nemo suscipit modi molestias sapiente quos
        quisquam non, voluptas quo sit voluptate beatae. Dolores, doloremque
        mollitia quis asperiores nemo consequuntur perspiciatis voluptate
        officiis esse excepturi amet quaerat! Aliquid nulla ipsa facere iusto
        quis voluptates molestias corrupti tenetur voluptatum beatae explicabo
        reiciendis sed aliquam vitae eius quaerat quasi, autem commodi nostrum
        amet nesciunt fuga dicta vel pariatur! Perspiciatis, reiciendis aperiam
        rerum animi ut a debitis consequuntur distinctio quos velit voluptas
        laboriosam doloribus qui sequi temporibus adipisci delectus eveniet
        officia quas magni odit. Fugiat, velit quos eum voluptas animi, ullam
        veniam, ex labore blanditiis quidem iure aut incidunt ipsam dolor
        doloremque deserunt reprehenderit alias fuga minima molestias beatae
        asperiores accusantium voluptates mollitia. Incidunt laborum temporibus
        ratione eius at delectus minus quas cumque non perferendis nulla
        deserunt, consequatur, assumenda quibusdam rerum ea voluptatem! Quae
        tenetur quas quaerat. Fuga unde quas ducimus sed qui cupiditate
        quibusdam, nostrum error voluptate repudiandae labore alias laborum
        libero placeat, sint illo consequatur dolores officiis. Ratione, a nam
        at aut temporibus aliquam culpa veritatis ea sed doloremque quasi,
        perspiciatis, repudiandae cupiditate corporis eos! Commodi quisquam
        sequi quidem incidunt, asperiores voluptatum rem sit velit ut
        repellendus! Iste ea cumque, eveniet quod aliquid cum alias aut dolores
        modi qui rerum consectetur odit commodi vel illo accusamus laboriosam,
        quis corporis natus quasi expedita asperiores voluptates? Ullam
        laudantium esse eaque pariatur eveniet. Quisquam nobis aut impedit vero
        eveniet, necessitatibus molestiae alias magnam saepe et at assumenda
        expedita, tempora distinctio optio! Doloremque labore maxime aspernatur,
        accusantium doloribus adipisci sit quibusdam dolore quaerat unde illum
        blanditiis dignissimos! Repudiandae, quisquam maxime qui nesciunt ab
        beatae, voluptatibus quidem, corporis ducimus natus nam? Voluptatibus
        facilis quae aspernatur fugit dolorum ex itaque quo molestiae, quod
        nostrum neque eveniet tempora libero dolore ut. Fugit laborum dolores
        aspernatur, corrupti impedit illum perspiciatis suscipit minus quos
        omnis earum, consequuntur doloribus sunt nisi obcaecati asperiores
        dolore ducimus nihil esse libero repellendus iusto corporis soluta
        voluptas. Quaerat, alias totam odit ut fugiat, quos beatae pariatur
        magni aliquid veniam, dicta excepturi quam illo repellendus architecto
        cum. Beatae cumque soluta odit itaque deleniti quos pariatur mollitia
        illo ipsa? Soluta libero modi numquam quae harum? In, rem recusandae
        officia hic quia doloribus doloremque expedita, ipsum rerum excepturi
        corporis. Omnis vitae possimus excepturi! Molestias ipsum consequuntur
        nostrum mollitia illum sapiente nemo at vitae sequi minima numquam
        excepturi nisi cum aliquid nulla accusantium alias fuga ex, deleniti sit
        non accusamus iure dolor quod. Quod molestias sint nobis, dolorum eaque
        distinctio soluta esse inventore, amet dolor ut optio earum quis?
        Placeat quaerat debitis dolorum quis beatae ipsum, facere quas. Ex
        nostrum deleniti quo recusandae maxime autem qui repellendus enim
        laudantium asperiores? Excepturi, optio voluptas! Fugit eligendi
        veritatis, ullam nihil consequuntur animi praesentium officiis quidem
        nesciunt illo facere recusandae molestiae architecto debitis quaerat.
        Est quas praesentium facilis iure corrupti rerum cumque vel, veniam,
        doloribus officiis libero labore. Numquam molestias accusamus pariatur
        voluptatem facilis quaerat beatae, dicta, cupiditate obcaecati delectus
        voluptatibus nobis possimus quibusdam corrupti! Quisquam nam voluptatem,
        inventore reiciendis sint blanditiis animi eius aut quis, consequuntur,
        illum distinctio ex delectus culpa maxime. Recusandae, repellendus quos.
        Soluta similique necessitatibus laborum nostrum laboriosam! Iste et ex
        dignissimos quisquam ea illum quasi. Porro saepe accusamus assumenda
        aliquid vel corporis suscipit natus, veniam iste at quis, dolore facere
        asperiores inventore? Voluptates optio at eos architecto nulla qui unde
        atque nostrum similique dolores error sapiente facilis, quod tenetur
        doloremque, sequi distinctio deleniti. Iure reprehenderit eligendi porro
        ullam quam nesciunt tempora deserunt similique aperiam! Exercitationem
        voluptatibus at quaerat voluptate natus laborum eum accusantium ipsam
        nihil nostrum, repellendus sapiente, minima dolores dolor, ullam ex
        dolorum optio! Voluptatum maxime eius facilis quaerat, vero id
        asperiores tenetur, in commodi ad necessitatibus sequi. Ad, minima
        recusandae! Sequi dolores quia sint et exercitationem maxime perferendis
        sed tenetur hic dignissimos. Eum dolorum temporibus eligendi aperiam
        laboriosam ea explicabo sit earum, nobis nesciunt nostrum tempora, hic
        ut ullam fugit quisquam, in doloribus ratione. Dicta aut non suscipit
        voluptas esse aliquid nulla! Ducimus error hic voluptatum iure quasi
        fuga nihil cum ullam maiores, molestias doloribus at obcaecati optio
        soluta blanditiis ex quas nulla, quo adipisci a veritatis? Quisquam,
        illum? Fugit delectus sint, et consequuntur sequi recusandae nemo
        dolores omnis? Quam alias eligendi amet quas voluptatibus vero esse
        deserunt, ipsum necessitatibus cum nesciunt suscipit minima ipsa, quo
        sint qui voluptas, adipisci harum architecto tenetur ducimus eum
        pariatur similique. Excepturi ducimus similique vitae quia dolor est
        nesciunt voluptas ipsam veniam quod nostrum, voluptatibus officiis eos
        eum incidunt aliquam sapiente, aliquid dignissimos itaque ea ut,
        expedita nam commodi in! Dolores expedita obcaecati necessitatibus
        consectetur exercitationem architecto. Quaerat aspernatur ullam,
        molestias doloribus maxime optio odit laborum dolor voluptatibus amet
        quia cupiditate voluptates distinctio voluptatem, animi voluptatum
        eveniet. Quam dicta ut natus modi obcaecati a id quae sint quod possimus
        reprehenderit quisquam, laborum perferendis, totam maiores in
        repudiandae, voluptatum sunt labore vitae molestias iure quaerat
        incidunt voluptates? Magnam et illum inventore at! Praesentium, dolore
        laboriosam accusamus numquam expedita iusto alias at vel?
      </article>
    </transition>
  </main>
</template>

<style lang="scss" scoped>
.wrap {
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  height: 400px;
  border: 1px solid lighten(#fe839a, 10);
  display: flex;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
}

.item {
  flex-grow: 1.5;
  height: 100%;
  background: linear-gradient(to bottom, #fe839a, #4a72ff);
  position: relative;
  transition: all 500ms ease-in-out;
  background-position: center;
  background-size: cover;
  border-image: fill 0 linear-gradient(#0003, #fff);

  &.item-hover {
    flex-grow: 2.3;
    background-color: lighten(darkred, 20);

    border-image: fill 0 linear-gradient(#0003, #0003);
    &::before {
      color: white;
          backdrop-filter: blur(5px);
    background: rgb(255, 255, 255,.3);
    }
  }

  &:before {
    content: attr(data-order);
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    overflow-wrap: normal;
    border-radius: 10px;
    padding: 10px 5px;
    width: 90px;
  }
}

.article {
  border: 1px solid #000;
}

.slide-enter-active,
.slide-leave-active {
  // transition: all 1s ease-in-out;
  // overflow: hidden;
}
.slide-enter,
.slide-leave-to {
  // max-height: 0;
  // opacity: 0;
}
.slide-enter-to,
.slide-leave {
  // max-height: 1000px;
  // opacity: 1;
}
</style>
