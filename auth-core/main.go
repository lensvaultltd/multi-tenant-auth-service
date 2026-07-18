package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("super_secret_key_change_in_production")

// Mock Database (Normally PostgreSQL with Tenant ID columns)
var usersDB = map[string]map[string]string{
	"tenant-alpha": {
		"admin@alpha.com": "hashed_password",
		"user@alpha.com":  "hashed_password",
	},
	"tenant-beta": {
		"admin@beta.com": "hashed_password",
	},
}

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	Email    string `json:"email"`
	TenantID string `json:"tenant_id"`
	jwt.RegisteredClaims
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Tenant-ID")
}

func Login(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == "OPTIONS" { return }

	tenantID := r.Header.Get("X-Tenant-ID")
	if tenantID == "" {
		http.Error(w, "Missing X-Tenant-ID Header", http.StatusBadRequest)
		return
	}

	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Strict Tenant Isolation Check
	tenantUsers, ok := usersDB[tenantID]
	if !ok {
		http.Error(w, "Invalid Tenant", http.StatusUnauthorized)
		return
	}

	_, userExists := tenantUsers[creds.Email]
	if !userExists {
		// Mock delay to prevent timing attacks
		time.Sleep(100 * time.Millisecond)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Generate JWT bound to Tenant
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Email:    creds.Email,
		TenantID: tenantID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}

func main() {
	r := mux.NewRouter()
	// Allow CORS preflight globally for simple mock
	r.HandleFunc("/api/login", Login).Methods("POST", "OPTIONS")

	fmt.Println("Multi-Tenant Auth Core running on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
