const sessionCache = {
    set (key: string | null, value: any) {
      if (!sessionStorage) {
        return
      }
      if (key != null && value != null) {
        sessionStorage.setItem(key, value)
      }
    },
    get (key: string | null) {
      if (!sessionStorage) {
        return null
      }
      if (key == null) {
        return null
      }
      return sessionStorage.getItem(key)
    },
    setJSON (key: string | null, jsonValue: any) {
      if (jsonValue != null) {
        this.set(key, JSON.stringify(jsonValue))
      }
    },
    getJSON (key: string | null) {
      const value = this.get(key)
      if (value != null) {
        return JSON.parse(value)
      }
    },
    remove (key: string) {
      sessionStorage.removeItem(key);
    }
  }
  const localCache = {
    set (key: string | null, value: string | null) {
      if (!localStorage) {
        return
      }
      if (key != null && value != null) {
        localStorage.setItem(key, value)
      }
    },
    get (key: string | null) {
      if (!localStorage) {
        return null
      }
      if (key == null) {
        return null
      }
      return localStorage.getItem(key)
    },
    setJSON (key: any, jsonValue: null) {
      if (jsonValue != null) {
        this.set(key, JSON.stringify(jsonValue))
      }
    },
    getJSON (key: string | null) {
      const value = this.get(key)
      if (value != null) {
        return JSON.parse(value)
      }
    },
    remove (key: string) {
      localStorage.removeItem(key);
    }
  }
  
  export default {
    /**
     * 会话级缓存
     */
    session: sessionCache,
    /**
     * 本地缓存
     */
    local: localCache
  }
  