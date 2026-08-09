package com.blooddonor.blooddonorsystem.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtFilter;
    private final String allowedOrigin;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter,
            @Value("${app.cors.allowed-origin}") String allowedOrigin) {
        this.jwtFilter = jwtFilter;
        this.allowedOrigin = allowedOrigin;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**", "/api-docs/**", "/swagger-ui/**", "/swagger-ui.html",
                                "/api/eligibility/**")
                        .permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/donors/me").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/donors/**", "/api/centers/**", "/api/stock/**",
                                "/api/test")
                        .permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/donors/register").permitAll()
                        .requestMatchers("/api/appointments/admin/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/appointments/*/complete").hasRole("ADMIN")
                        .requestMatchers("/api/appointments/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/urgent-requests", "/api/urgent-requests/*/matches")
                        .hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/appointments/*/complete").hasRole("ADMIN")
                        .requestMatchers("/api/appointments/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/feedback").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/feedback/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/urgent-requests").authenticated()
                        .requestMatchers("/api/stock").hasRole("ADMIN")

                        .anyRequest().authenticated())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(allowedOrigin));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(false);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
