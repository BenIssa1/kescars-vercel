import { initEdgeStore } from "@edgestore/server"
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app'

const es = initEdgeStore.create()

/**
 * Il s'agit du routeur principal pour les compartiments Edge Store.
*/
const edgestoreRouter = es.router({
    publicFiles: es.fileBucket()
})

const handler = createEdgeStoreNextHandler({
    router: edgestoreRouter,
})

export { handler as GET, handler as POST }

/**
 * Ce type est utilisé pour créer le client de type sécurisé pour le frontend.
*/
export type EdgeStoreRouter = typeof edgestoreRouter