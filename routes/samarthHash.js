 function murmur(key, seed) {
    key = key.toString();
    seed = seed || 0;
    
    const c1 = 0xcc9e2d51;
    const c2 = 0x1b873593;
    const r1 = 15;
    const r2 = 13;
    const m = 5;
    const n = 0xe6546b64;

    let hash = seed;
    
    function mix(h, k) {
        k *= c1;
        k = (k << r1) | (k >>> (32 - r1));
        k *= c2;

        h ^= k;
        h = (h << r2) | (h >>> (32 - r2));
        h = h * m + n;

        return h;
    }

    const chunks = Math.ceil(key.length / 4);

    for (let i = 0; i < chunks; i++) {
        let chunk = key.charCodeAt(i * 4) +
                    (key.charCodeAt(i * 4 + 1) << 8) +
                    (key.charCodeAt(i * 4 + 2) << 16) +
                    (key.charCodeAt(i * 4 + 3) << 24);

        hash = mix(hash, chunk);
    }

    const remaining = key.length % 4;
    let tail = 0;

    if (remaining !== 0) {
        tail = key.charCodeAt(chunks * 4);

        if (remaining > 1) {
            tail |= key.charCodeAt(chunks * 4 + 1) << 8;
        }
        
        if (remaining > 2) {
            tail |= key.charCodeAt(chunks * 4 + 2) << 16;
        }
    }

    hash ^= tail;
    hash ^= key.length;
    hash ^= hash >>> 16;
    hash *= 0x85ebca6b;
    hash ^= hash >>> 13;
    hash *= 0xc2b2ae35;
    hash ^= hash >>> 16;

    return hash >>> 0;
}

module.exports=murmur;