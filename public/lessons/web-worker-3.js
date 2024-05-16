self.importScripts( 'https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js' )

onmessage = function( event ) {
    postMessage( Sha256.hash ( event.data ) )
}