package proj.pet.cache.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import proj.pet.cache.domain.CacheType;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {

	@Bean
	public CacheManager cacheManager() {
		List<CaffeineCache> caches = Arrays.stream(CacheType.values())
				.map(cacheType ->
						new CaffeineCache(
								cacheType.name(),
								Caffeine.newBuilder()
										.recordStats()
										.expireAfterWrite(cacheType.getSecsToExpireAfterWrite(), TimeUnit.SECONDS)
										.maximumSize(cacheType.getEntryMaxSize())
										.build()))
				.toList();
		
		SimpleCacheManager cacheManager = new SimpleCacheManager();
		cacheManager.setCaches(caches);
		return cacheManager;
	}
}
