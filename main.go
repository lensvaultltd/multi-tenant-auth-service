package main

import (
	"fmt"
	"net/http"
	"time"
	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("super_secret_key_rotate_me")

type Claims struct {
	TenantID string `json:"tenant_id"`
	Role     string `json:"role"`
	jwt.RegisteredClaims
}

func GenerateToken(tenantID, role string) (string, error) {
	expirationTime := time.Now().Add(15 * time.Minute)
	claims := &Claims{
		TenantID: tenantID,
		Role:     role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func main() {
	fmt.Println("Multi-Tenant Auth Service started on :8080")
	http.ListenAndServe(":8080", nil)
}
